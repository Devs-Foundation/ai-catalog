# Changelog

All notable changes to **AI Catalog** are documented here.

## [Unreleased]

### Added
- Live at **[catalog.devs.foundation](https://catalog.devs.foundation)** — free, no sign-up.
- Catalog of **24 providers and 200+ models** (paid, free and open-weight).
- **Local LLMs** section — tools to run models on your own machine.
- Full **6-language** UI and content (EN · PT · ES · FR · DE · ZH), with automatic detection of the visitor's browser language on first visit.
- Side-by-side model comparison, search, and specialty/price filters.
- MIT `LICENSE` and a data/trademark disclaimer.

### Security
- Admin-token guard on all write endpoints (public reads unaffected).
- In-memory API rate limiting.
- Hardened edge response headers: HSTS (preload), `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`; server/version banners removed. See [`SECURITY.md`](SECURITY.md) and [`deploy/security-headers.caddy`](deploy/security-headers.caddy).
- Independent penetration test: **10/10, zero critical vulnerabilities**.

---

<sub>Part of **Dev's Foundation** · N models. N devices. One brain.</sub>
