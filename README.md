<h1 align="center">🧠 Catálogo de IA</h1>

<p align="center">
  <b>The open AI catalog</b> — compare <b>paid & free</b> AI models across every provider,<br/>
  with prices, licenses, capabilities and specialties, in one place.
</p>

<p align="center">
  <i>Built by</i> <b>Dev's Foundation</b> — <i>one brain, many minds.</i><br/>
  <a href="https://devs.foundation">devs.foundation</a> ·
  <a href="https://github.com/Devs-Foundation">GitHub</a> ·
  <a href="https://x.com/DevsFoundation">X</a>
</p>

---

## What it is

**Catálogo de IA** is a comparative catalog of AI **providers** and **models**. It answers the questions builders actually ask:

- Which models exist, from which provider, and **what are they good at**?
- **How much do they cost** — and which ones are **free / open-weight**?
- What's the **license**, the **context window**, the **modalities**?
- Which model fits *my* use case — and how does it compare, side by side?

It ships with a **Dashboard**, a **Providers** directory, per-**Model** detail pages, an **LLMs** view, side-by-side **comparison**, and a simple **Admin** panel to keep the data fresh. Content is written in **European Portuguese (PT-PT)**, structured for future multilingual support.

## Features

- 📊 **Compare paid & free** models across ~20 providers and ~30+ models
- 💸 **Real pricing** — USD per million tokens, or per-unit (per-image / per-second / subscription) with clear notes
- 🆓 **Open vs. proprietary** — open-weight and free-tier models flagged, not buried
- 🧩 **Capabilities & specialties** — modalities and strengths as filterable tags
- 🔎 **Filter, search, and compare** — find the right model, then put candidates head to head
- 🕒 **Freshness signals** — `isPotentiallyOutdated` computed at read time (data older than 120 days is flagged)
- 🛠️ **Simple admin** — add and update the catalog without a migration for every change

## Tech stack

| Layer | Tech |
|---|---|
| Monorepo | **pnpm workspaces**, Node.js 24, TypeScript 5.9 |
| API | **Express 5** (REST) |
| Database | **PostgreSQL** + **Drizzle ORM** |
| Validation | **Zod** (`zod/v4`), `drizzle-zod` |
| API codegen | **Orval** (typed hooks + Zod schemas from an OpenAPI spec) |
| Build | **esbuild** (CJS bundle) |
| Frontend | **React + Vite** (`ai-catalog` artifact) |

## Getting started

**Requirements:** Node.js 24, pnpm, a PostgreSQL database (`DATABASE_URL`).

```bash
# install
pnpm install

# set your Postgres connection
export DATABASE_URL="postgres://user:pass@host:5432/db"

# push the schema (dev only)
pnpm --filter @workspace/db run push

# seed the providers/models catalog
pnpm --filter @workspace/scripts run seed-catalog

# run the API server (port 5000)
pnpm --filter @workspace/api-server run dev
```

Useful workspace commands:

```bash
pnpm run typecheck      # full typecheck across all packages
pnpm run build          # typecheck + build all packages
pnpm --filter @workspace/api-spec run codegen   # regenerate hooks + Zod from OpenAPI
```

## Project structure

```
.
├── lib/
│   ├── api-spec/         # openapi.yaml — source-of-truth API contract
│   ├── api-zod/          # generated Zod schemas
│   ├── api-client-react/ # generated React query hooks
│   └── db/               # Drizzle schema (providersTable, modelsTable)
├── artifacts/
│   ├── api-server/       # Express REST API (providers, models, stats, meta)
│   ├── ai-catalog/       # React + Vite frontend (Dashboard, Providers, Models, Admin)
│   └── mockup-sandbox/   # UI mockups / sandbox
└── scripts/
    └── src/seed-catalog.ts   # seed data for ~20 providers and ~30+ models
```

**Where the important bits live:**

- `lib/api-spec/openapi.yaml` — the API contract (providers, models, stats, meta)
- `lib/db/src/schema/providers.ts` — `providersTable` and `modelsTable`
- `artifacts/api-server/src/routes/{providers,models,stats,meta}.ts` — REST endpoints
- `artifacts/api-server/src/lib/catalog.ts` — DB → API mapping (incl. freshness logic)
- `scripts/src/seed-catalog.ts` — the catalog data
- `artifacts/ai-catalog/src/lib/translations.ts` — centralized PT-PT strings

## Data & design notes

- **Prices** are stored as `doublePrecision` (USD per million tokens), with `priceNotes` / `priceUnit` for non-token pricing (per-image, per-second, subscription).
- **`isPotentiallyOutdated`** is computed at read time from `lastUpdatedAt` (>120 days), never stored — so the threshold can change without a migration.
- **Modalities and specialties** are Postgres text arrays on the model row (filtered with `arrayOverlaps`) — no join tables, since the set is small.
- The MVP `/admin` panel is intentionally unprotected (simple, free-tier, no auth integration).

## Roadmap

- 🌍 Multilingual UI (the PT-PT strings are already centralized for it)
- 🔄 Automated freshness / price sync from provider sources
- ⭐ Richer benchmarks and per-task recommendations
- 🔓 Public API + embeds

## About Dev's Foundation

**Dev's Foundation** is the first system where many AI models — across many devices — share **one persistent, git-synced brain** and decide by **consensus**. Infinite, shared memory. Self-hosted, private, end-to-end. **One learns, all know.**

This catalog is part of that mission: making the fast-moving world of AI models **legible** — what's out there, what it costs, what's free, and what it's good for.

> **N models. N devices. One brain.**

<p align="center">
  <sub>© Dev's Foundation · <a href="https://devs.foundation">devs.foundation</a> · Built in the open.</sub>
</p>
