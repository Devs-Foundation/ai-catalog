---
name: i18n via LanguageContext
description: How ai-catalog implements multi-language support and the convention to follow when adding new UI copy.
---

The ai-catalog artifact supports pt/en/es/fr via a single `Translations` type (inferred from the `pt` object) in `src/lib/translations.ts`, with one fully-populated object per language exported as `translations: Record<LanguageCode, Translations>`.

A `LanguageProvider`/`useLanguage()` context (`src/lib/LanguageContext.tsx`) holds the active language, persists it to `localStorage` (`ai-catalog:language`), and exposes `t` (the active language's translation object). Components call `const { t } = useLanguage()` instead of importing `pt` directly.

**Why:** the app originally had a single static `pt` translations object imported directly by every page/component. Adding real multi-language support required swapping every `pt.` reference for a context-provided `t.`, and centralizing ALL user-facing strings (including ones that had been hardcoded inline, e.g. dropdown option labels, table headers, toast messages) into the shared `Translations` shape so every language object has matching keys enforced by TypeScript.

**How to apply:** when adding any new user-facing string to ai-catalog, add the key to every language object in `translations.ts` (pt/en/es/fr) first — TypeScript will error if a language object is missing a key — then consume it via `useLanguage().t` in the component. Never hardcode a literal Portuguese (or other language) string directly in JSX.
