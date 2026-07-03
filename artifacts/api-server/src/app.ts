import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind the Caddy reverse proxy: trust the first proxy so req.ip reflects the
// real client (from X-Forwarded-For) for rate limiting.
app.set("trust proxy", 1);

// Lightweight in-memory rate limiter (no external dependency): fixed window per
// client IP. Protects the public read API from hammering / scraping abuse.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 240; // requests per IP per minute
const rateHits = new Map<string, { count: number; reset: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of rateHits) {
    if (now > rec.reset) rateHits.delete(ip);
  }
}, RATE_WINDOW_MS).unref();

app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  let rec = rateHits.get(ip);
  if (!rec || now > rec.reset) {
    rec = { count: 0, reset: now + RATE_WINDOW_MS };
    rateHits.set(ip, rec);
  }
  rec.count += 1;
  if (rec.count > RATE_MAX) {
    res.setHeader("Retry-After", String(Math.ceil((rec.reset - now) / 1000)));
    res.status(429).json({ error: "Too many requests. Please slow down." });
    return;
  }
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Write guard: reads (GET/HEAD/OPTIONS) stay public; any mutation requires a
// matching admin token. Fail-closed — if ADMIN_TOKEN is not configured, all
// writes are rejected, so the public deployment can never be modified anonymously.
app.use("/api", (req, res, next) => {
  const isRead =
    req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS";
  if (isRead) return next();

  const expected = process.env["ADMIN_TOKEN"];
  const provided =
    req.header("x-admin-token") ||
    (req.header("authorization") || "").replace(/^Bearer\s+/i, "");

  if (!expected || provided !== expected) {
    res.status(403).json({
      error: "Forbidden: a valid admin token is required for write operations.",
    });
    return;
  }
  next();
});

app.use("/api", router);

export default app;
