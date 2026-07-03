import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LanguageCode, translations, Translations } from "@/lib/translations";

const STORAGE_KEY = "ai-catalog:language";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const tag of candidates) {
    if (!tag) continue;
    const code = tag.toLowerCase().split("-")[0];
    if (code in translations) return code as LanguageCode;
  }
  return DEFAULT_LANGUAGE;
}

function readStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in translations) {
    return stored as LanguageCode;
  }
  // First visit (no saved preference): follow the visitor's browser language,
  // falling back to the default. Once they pick a language it is stored and wins.
  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => readStoredLanguage());

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return ctx;
}
