import { LanguageCode } from "./translations";
import { modelDescriptions } from "./descriptions.models";
import { providerDescriptions } from "./descriptions.providers";

// DB-sourced text (model/provider descriptions) is authored in PT-PT. These maps
// hold per-language translations keyed by slug. Resolution order:
//   selected language → PT fallback (the DB value) → English → empty.
// A missing entry gracefully degrades to the original PT description.
export type DescMap = Record<string, Partial<Record<LanguageCode, string>>>;

function pick(
  map: DescMap,
  slug: string | undefined | null,
  lang: LanguageCode,
  fallback?: string | null,
): string {
  const entry = slug ? map[slug] : undefined;
  return (entry && entry[lang]) || fallback || (entry && entry.en) || "";
}

export function modelDescription(
  slug: string | undefined | null,
  lang: LanguageCode,
  fallback?: string | null,
): string {
  return pick(modelDescriptions, slug, lang, fallback);
}

export function providerDescription(
  slug: string | undefined | null,
  lang: LanguageCode,
  fallback?: string | null,
): string {
  return pick(providerDescriptions, slug, lang, fallback);
}
