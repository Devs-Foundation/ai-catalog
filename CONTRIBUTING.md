# Contributing — Catálogo de IA

Thanks for helping keep the AI catalog **accurate and complete**. The most valuable contribution is fresh, correct data: new models, updated prices, corrected specs.

> Built by **Dev's Foundation** — *one learns, all know.*

## Setup

```bash
pnpm install
cp .env.example .env          # set DATABASE_URL
pnpm --filter @workspace/db run push
pnpm --filter @workspace/scripts run seed-catalog
pnpm --filter @workspace/api-server run dev   # http://localhost:5000
```

Before opening a PR:

```bash
pnpm run typecheck            # must pass
pnpm run build
```

## Adding or updating a model

Catalog data lives in **`scripts/src/seed-catalog.ts`**.

- **Providers** → the `providers` array (`ProviderSeed`).
- **Models** → the `models` array (`ModelSeed`), each linked to a provider via `providerSlug`.

A model entry follows this shape (match it exactly — types are enforced):

```ts
{
  providerSlug: "anthropic",
  slug: "claude-opus-4-8",
  name: "Claude Opus 4.8",
  description: "Short, factual description in PT-PT.",
  pricingType: "paid",            // "paid" | "free" | "open-weight" | ...
  priceInputPerMillionTokens: 18, // USD / 1M tokens (or null)
  priceOutputPerMillionTokens: 90,
  priceUnit: "por milhão de tokens",
  priceNotes: null,               // for per-image / per-second / subscription pricing
  contextWindowTokens: 300000,
  maxOutputTokens: 64000,
  modalitiesInput: ["text", "image"],
  modalitiesOutput: ["text"],
  specialties: ["raciocínio", "código", "agentes"],
  apiAvailable: true,
  officialLink: "https://…",
  releaseDate: "2026-04-10",      // YYYY-MM-DD
}
```

Data guidelines:

- **Prices**: USD per **million tokens**. For non-token pricing (per-image, per-second, subscription), leave the token prices `null` and use `priceUnit` + `priceNotes`.
- **Free / open**: reflect reality in `pricingType` — don't bury open-weight or free-tier models.
- **Specialties / modalities**: reuse existing tag values where possible (they're filtered with `arrayOverlaps`).
- **Sources**: link the `officialLink` to the provider's own docs/pricing, and keep `releaseDate` accurate — the catalog flags data older than 120 days.
- Keep descriptions **factual and in European Portuguese (PT-PT)**. No hype.

After editing, run `seed-catalog` locally and check the model renders correctly in the UI.

## Style

- TypeScript strict; `pnpm run typecheck` must pass.
- Small, focused PRs. One provider or a coherent batch of models per PR.
- Conventional-ish commits: `data:`, `fix:`, `feat:`, `docs:`.

---

<sub>Part of **Dev's Foundation** · <a href="https://devs.foundation">devs.foundation</a></sub>
