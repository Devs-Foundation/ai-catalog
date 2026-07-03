import { Link } from "wouter";
import { useGetModel } from "@workspace/api-client-react";
import { useCompare } from "@/lib/CompareContext";
import { useLanguage } from "@/lib/LanguageContext";
import { Translations } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Scale, X, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

function formatPrice(price?: number | null) {
  if (price === 0) return "0";
  if (price === null || price === undefined) return "N/A";
  return `$${price.toFixed(4)}`;
}

function ComparedModelColumn({ id, t }: { id: number; t: Translations }) {
  const { remove } = useCompare();
  const { data: model, isLoading, isError } = useGetModel(id);

  if (isLoading) {
    return (
      <div className="space-y-4 min-w-[240px]">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !model) {
    return (
      <div className="min-w-[240px] p-4 border rounded-xl text-sm text-destructive">
        {t.common.error}
      </div>
    );
  }

  const pricingLabel =
    t.models.pricingType[model.pricingType as keyof typeof t.models.pricingType] || model.pricingType;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: t.compare.fields.provider, value: <Link href={`/providers/${model.providerId}`} className="text-primary hover:underline">{model.providerName}</Link> },
    { label: t.compare.fields.pricingType, value: <Badge variant={model.pricingType === "open_source" ? "default" : "secondary"} className="uppercase text-[10px]">{pricingLabel}</Badge> },
    { label: t.compare.fields.priceInput, value: `${formatPrice(model.priceInputPerMillionTokens)} ${model.priceUnit ? `/ ${model.priceUnit}` : ""}` },
    { label: t.compare.fields.priceOutput, value: `${formatPrice(model.priceOutputPerMillionTokens)} ${model.priceUnit ? `/ ${model.priceUnit}` : ""}` },
    { label: t.compare.fields.contextWindow, value: model.contextWindowTokens ? model.contextWindowTokens.toLocaleString() : "N/A" },
    { label: t.compare.fields.maxOutput, value: model.maxOutputTokens ? model.maxOutputTokens.toLocaleString() : "N/A" },
    {
      label: t.compare.fields.modalitiesInput,
      value: model.modalitiesInput?.length ? (
        <div className="flex flex-wrap gap-1">
          {model.modalitiesInput.map((mod) => (
            <Badge key={mod} variant="outline" className="text-[10px]">
              {t.models.modality[mod as keyof typeof t.models.modality] || mod}
            </Badge>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },
    {
      label: t.compare.fields.modalitiesOutput,
      value: model.modalitiesOutput?.length ? (
        <div className="flex flex-wrap gap-1">
          {model.modalitiesOutput.map((mod) => (
            <Badge key={mod} variant="outline" className="text-[10px]">
              {t.models.modality[mod as keyof typeof t.models.modality] || mod}
            </Badge>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },
    {
      label: t.compare.fields.specialties,
      value: model.specialties?.length ? (
        <div className="flex flex-wrap gap-1">
          {model.specialties.map((spec) => (
            <Badge key={spec} variant="outline" className="text-[10px] bg-muted/30">
              {spec}
            </Badge>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },
    { label: t.compare.fields.apiAvailable, value: model.apiAvailable ? t.common.yes : t.common.no },
    { label: t.compare.fields.lastUpdated, value: format(new Date(model.lastUpdatedAt), "dd/MM/yyyy") },
  ];

  return (
    <div className="min-w-[240px] flex-1 flex flex-col rounded-xl border bg-card overflow-hidden">
      <div className="relative p-4 border-b space-y-2">
        <button
          onClick={() => remove(model.id)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
          title={t.compare.remove}
        >
          <X className="w-4 h-4" />
        </button>
        {model.isPotentiallyOutdated && (
          <div className="flex items-center gap-1 text-[11px] text-destructive font-medium">
            <AlertTriangle className="w-3 h-3" />
            {t.common.outdatedWarning}
          </div>
        )}
        <Link href={`/models/${model.id}`} className="font-semibold text-lg hover:text-primary transition-colors block pr-6">
          {model.name}
        </Link>
      </div>
      <div className="divide-y divide-border/60">
        {rows.map((row) => (
          <div key={row.label} className="px-4 py-3 space-y-1">
            <div className="text-xs text-muted-foreground">{row.label}</div>
            <div className="text-sm font-medium">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComparePage() {
  const { ids, clear } = useCompare();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.compare.title}</h1>
          <p className="text-muted-foreground mt-1">{t.compare.subtitle}</p>
        </div>
        {ids.length > 0 && (
          <Button variant="outline" size="sm" onClick={clear} className="w-fit">
            <X className="w-3.5 h-3.5 mr-1.5" />
            {t.compare.clearAll}
          </Button>
        )}
      </div>

      {ids.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center border rounded-xl border-dashed bg-muted/20">
          <Scale className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium">{t.compare.empty}</h3>
          <p className="text-muted-foreground mt-1 mb-4">{t.compare.emptyHint}</p>
          <Button asChild>
            <Link href="/">{t.compare.backToCatalog}</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {ids.map((id) => (
            <ComparedModelColumn key={id} id={id} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}
