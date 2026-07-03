---
name: Drizzle push column type changes
description: drizzle-kit push fails when altering an existing column's Postgres type on a non-empty table; workaround for dev DBs.
---

`drizzle-kit push` (even with `--force`) refuses to alter a column's underlying Postgres type (e.g. `text` → `doublePrecision`) when Postgres can't auto-cast the existing data, raising `column cannot be cast automatically to type X` with a `USING ...::type` hint.

**Why:** drizzle-kit generates a plain `ALTER COLUMN TYPE` without a `USING` clause, so any non-trivial type change on a populated column fails regardless of `--force`.

**How to apply:** In dev (no important data yet), just drop the affected table (`DROP TABLE ... CASCADE`) via the database tool, then re-run `drizzle-kit push` to recreate it cleanly. Do this only when the table is empty/disposable — never on a table with real user data.
