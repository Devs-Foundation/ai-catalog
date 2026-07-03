import { useRoute } from "wouter";
import { useGetModel } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/LanguageContext";
import { specialtyLabel } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, ExternalLink, Box, Cpu, Info, Check, X } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ModelDetailPage() {
  const [, params] = useRoute("/models/:id");
  const id = Number(params?.id);
  const { t, language } = useLanguage();

  const { data: model, isLoading, isError } = useGetModel(id);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !model) {
    return <div className="text-center py-20 text-destructive">{t.common.error}</div>;
  }

  const formatPrice = (price?: number | null) => {
    if (price === 0) return "0";
    if (!price) return "N/A";
    return `$${price.toFixed(4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {model.isPotentiallyOutdated && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t.common.outdatedWarning.split(":")[0]}</AlertTitle>
          <AlertDescription>
            {t.common.outdatedWarning}
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/providers/${model.providerId}`} className="hover:text-primary transition-colors">
            {model.providerName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{model.name}</span>
        </div>
        
        <div className="flex items-start justify-between">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{model.name}</h1>
          <Badge variant={model.pricingType === 'open_source' ? 'default' : 'secondary'} className="text-sm px-3 py-1 uppercase">
            {t.models.pricingType[model.pricingType as keyof typeof t.models.pricingType] || model.pricingType}
          </Badge>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          {model.description || t.common.notAvailable}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {model.officialLink && (
            <a href={model.officialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
              {t.models.detail.officialPage} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          )}
          {model.apiAvailable && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-md border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <Cpu className="w-3.5 h-3.5 mr-1.5" /> {t.models.detail.apiAvailable}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pricing Specs */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Box className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold">{t.models.detail.pricingCapacity}</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">{t.models.fields.priceInput}</span>
                <span className="text-2xl font-medium font-mono block">
                  {formatPrice(model.priceInputPerMillionTokens)}
                </span>
                <span className="text-xs text-muted-foreground">{t.common.per} {model.priceUnit || '1M tokens'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">{t.models.fields.priceOutput}</span>
                <span className="text-2xl font-medium font-mono block">
                  {formatPrice(model.priceOutputPerMillionTokens)}
                </span>
                <span className="text-xs text-muted-foreground">{t.common.per} {model.priceUnit || '1M tokens'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">{t.models.fields.contextWindow}</span>
                <span className="text-xl font-medium block">
                  {model.contextWindowTokens ? model.contextWindowTokens.toLocaleString() : 'N/A'}
                </span>
                <span className="text-xs text-muted-foreground">{t.common.tokens}</span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">{t.models.fields.maxOutput}</span>
                <span className="text-xl font-medium block">
                  {model.maxOutputTokens ? model.maxOutputTokens.toLocaleString() : 'N/A'}
                </span>
                <span className="text-xs text-muted-foreground">{t.common.tokens}</span>
              </div>
            </div>
          </div>
          
          {model.priceNotes && (
            <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{model.priceNotes}</span>
            </div>
          )}
        </div>

        {/* Features Specs */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 bg-accent/10 text-accent rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold">{t.models.detail.modalitiesUsage}</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground block">{t.models.detail.modalitiesInput}</span>
              <div className="flex flex-wrap gap-2">
                {model.modalitiesInput?.length ? model.modalitiesInput.map((mod) => (
                  <Badge key={mod} variant="secondary">
                    {t.models.modality[mod as keyof typeof t.models.modality] || mod}
                  </Badge>
                )) : <span className="text-sm text-muted-foreground">{t.models.detail.noneSpecified}</span>}
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground block">{t.models.detail.modalitiesOutput}</span>
              <div className="flex flex-wrap gap-2">
                {model.modalitiesOutput?.length ? model.modalitiesOutput.map((mod) => (
                  <Badge key={mod} variant="outline" className="border-accent text-foreground">
                    {t.models.modality[mod as keyof typeof t.models.modality] || mod}
                  </Badge>
                )) : <span className="text-sm text-muted-foreground">{t.models.detail.noneSpecified}</span>}
              </div>
            </div>

            {model.specialties && model.specialties.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">{t.models.fields.specialties}</span>
                <div className="flex flex-wrap gap-2">
                  {model.specialties.map((spec) => (
                    <Badge key={spec} variant="outline" className="bg-muted/30">
                      {specialtyLabel(spec, language)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-muted-foreground pt-4 border-t">
        {model.releaseDate && (
          <div>
            <span className="font-medium mr-2">{t.models.detail.releaseDateLabel}</span>
            {format(new Date(model.releaseDate), "dd/MM/yyyy")}
          </div>
        )}
        <div>
          <span className="font-medium mr-2">{t.models.detail.updatedAtLabel}</span>
          {format(new Date(model.lastUpdatedAt), "dd/MM/yyyy")}
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">{t.models.detail.verifiedByAdminLabel}</span>
          {model.verifiedByAdmin ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>
    </div>
  );
}
