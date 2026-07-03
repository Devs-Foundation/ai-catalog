# Catálogo de IA

Catálogo comparativo de fornecedores e modelos de Inteligência Artificial (preços, licenças, capacidades e especialidades), em português europeu.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed-catalog` — reset and re-seed the providers/models catalog data
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite (artifact `ai-catalog`, previewPath `/`)

## Where things live

- `lib/api-spec/openapi.yaml` — source-of-truth API contract (providers, models, stats, meta endpoints)
- `lib/db/src/schema/providers.ts` — DB schema for `providersTable` and `modelsTable`
- `artifacts/api-server/src/routes/{providers,models,stats,meta}.ts` — REST endpoints
- `artifacts/api-server/src/lib/catalog.ts` — DB row → API response mapping, incl. `isPotentiallyOutdated` logic
- `scripts/src/seed-catalog.ts` — seed data for ~20 AI providers and ~30 models
- `artifacts/ai-catalog/src/pages` — Dashboard (`/`), Providers (`/providers`, `/providers/:id`), Model detail (`/models/:id`), Admin (`/admin`)
- `artifacts/ai-catalog/src/lib/translations.ts` — centralized PT-PT strings, structured for future multilingual support

## Architecture decisions

- Prices stored as `doublePrecision` (USD per million tokens, or per-unit with `priceNotes`/`priceUnit` for non-token pricing like per-image/per-second/subscription).
- `isPotentiallyOutdated` is computed at read time from `lastUpdatedAt` (>120 days old), not stored, so the threshold can change without a migration.
- Modalities and specialties stored as Postgres text arrays on the model row (no separate join tables) since the set is small and filtered with `arrayOverlaps`.
- No admin authentication in this MVP — the `/admin` panel is unprotected, matching the "simple admin panel" requirement (free tier, no auth integration requested).

## Product

- Public dashboard comparing AI providers/models: search, filter (provider, price/license, modality, specialty, open-source, API availability), sort by price/context/recency.
- Provider and model detail pages with pricing, context window, modalities, specialties, official links, and an "possibly outdated" warning badge.
- Admin panel (`/admin`) to mark providers/models as manually verified.
- All UI copy in European Portuguese, centralized in `translations.ts` for future multilingual support. No emojis anywhere per user requirement.

## User preferences

- UI language: European Portuguese (PT-PT). No emojis anywhere in the UI.

## Gotchas

- If you change a DB column's type on a non-empty table, `drizzle-kit push` may refuse (Postgres can't auto-cast); see `.agents/memory/drizzle-column-type-change.md`.
- After editing `lib/api-spec/openapi.yaml`, re-run `pnpm --filter @workspace/api-spec run codegen` before using new hooks/schemas in the frontend or API server.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
