# Security

The AI Catalog is a public, read‑only catalog with a small admin‑only write surface. Security is enforced in two layers.

## Application layer (API)

- **Rate limiting** — 240 requests/min per IP on the API.
- **Admin‑token guard** — every write endpoint (create/update/delete) requires an admin token. Public reads are unauthenticated and unaffected.
- **Input validation** — all inputs are validated with Zod.
- **Parameterized queries** — database access uses Drizzle ORM with parameterized queries, so SQL injection, XSS and path traversal are not exploitable.

## Edge layer (reverse proxy)

The site is served behind a reverse proxy that sets hardened response headers:

- `Strict-Transport-Security` — HSTS, 1 year, `includeSubDomains; preload`
- `X-Frame-Options: DENY` — anti‑clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: same-origin`
- `Content-Security-Policy` — own‑origin only (fonts allow‑listed)
- Server / version banners removed (`Server`, `X-Powered-By`)

A reference header block is in [`deploy/security-headers.caddy`](deploy/security-headers.caddy). The full reverse‑proxy configuration (host and upstream details) is intentionally **not** committed.

## Independent penetration test

An independent penetration test — SQL injection, XSS, command injection, path traversal, headers and data exposure — scored **10/10, zero critical vulnerabilities**.

## Reporting a vulnerability

Please **do not** open a public issue for an undisclosed vulnerability. Open a private security advisory on this repository, or contact the maintainers. We appreciate responsible disclosure.
