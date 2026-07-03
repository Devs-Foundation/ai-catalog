import { Link } from "wouter";
import { useCompare } from "@/lib/CompareContext";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Scale, X } from "lucide-react";

export function CompareBar() {
  const { ids, clear } = useCompare();
  const { t } = useLanguage();

  if (ids.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-card/95 backdrop-blur shadow-lg shadow-black/20 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Scale className="w-4 h-4 text-primary" />
          <span>
            {ids.length} {t.compare.barLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear} className="text-muted-foreground">
            <X className="w-3.5 h-3.5 mr-1" />
            {t.compare.clearAll}
          </Button>
          <Button size="sm" asChild>
            <Link href="/compare">{t.compare.viewComparison}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
