import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

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
