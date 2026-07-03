import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ai-catalog:compare-ids";
const MAX_COMPARE = 4;

interface CompareContextValue {
  ids: number[];
  isSelected: (id: number) => boolean;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

function readStoredIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is number => typeof v === "number");
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>(() => readStoredIds());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existing) => existing !== id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setIds((prev) => prev.filter((existing) => existing !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const isSelected = useCallback((id: number) => ids.includes(id), [ids]);

  const value = useMemo<CompareContextValue>(
    () => ({ ids, isSelected, toggle, remove, clear, canAddMore: ids.length < MAX_COMPARE }),
    [ids, isSelected, toggle, remove, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare deve ser usado dentro de um CompareProvider");
  }
  return ctx;
}

export const MAX_COMPARE_MODELS = MAX_COMPARE;
