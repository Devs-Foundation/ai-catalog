import { ModelWithProvider } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { AlertTriangle, Cpu, ExternalLink } from "lucide-react";
import { useCompare } from "@/lib/CompareContext";
import { useLanguage } from "@/lib/LanguageContext";

export function ModelCard({ model }: { model: ModelWithProvider }) {
  const { isSelected, toggle, canAddMore } = useCompare();
  const { t: pt } = useLanguage();
  const selected = isSelected(model.id);

  const formatPrice = (price?: number | null) => {
    if (price === 0) return "Grátis";
    if (!price) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  const pricingLabel = pt.models.pricingType[model.pricingType as keyof typeof pt.models.pricingType] || model.pricingType;

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 overflow-hidden relative">
      {model.isPotentiallyOutdated && (
        <div className="absolute top-0 left-0 w-full bg-destructive/10 text-destructive text-xs py-1 px-3 flex items-center justify-center font-medium">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {pt.common.outdatedWarning}
        </div>
      )}
      <CardHeader className={`pb-3 ${model.isPotentiallyOutdated ? 'pt-8' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <Link href={`/providers/${model.providerId}`} className="text-xs font-medium text-primary hover:underline">
            {model.providerName}
          </Link>
          <Badge variant={model.pricingType === 'open_source' ? 'default' : 'secondary'} className="text-[10px] uppercase">
            {pricingLabel}
          </Badge>
        </div>
        <CardTitle className="text-xl">
          <Link href={`/models/${model.id}`} className="hover:text-primary transition-colors">
            {model.name}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {model.description || pt.common.notAvailable}
        </p>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">{pt.models.fields.contextWindow}</span>
            <span className="font-mono">{model.contextWindowTokens ? `${(model.contextWindowTokens / 1000).toFixed(0)}k` : 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">{pt.models.fields.maxOutput}</span>
            <span className="font-mono">{model.maxOutputTokens ? `${(model.maxOutputTokens / 1000).toFixed(0)}k` : 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">{pt.models.fields.priceInput}</span>
            <span className="font-medium text-foreground">{formatPrice(model.priceInputPerMillionTokens)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">{pt.models.fields.priceOutput}</span>
            <span className="font-medium text-foreground">{formatPrice(model.priceOutputPerMillionTokens)}</span>
          </div>
        </div>

        {model.modalitiesInput && model.modalitiesInput.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {model.modalitiesInput.map((mod) => (
              <Badge key={mod} variant="outline" className="bg-secondary/30 text-[10px] border-none">
                {pt.models.modality[mod as keyof typeof pt.models.modality] || mod}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 border-t border-border/50 bg-secondary/10 flex justify-between items-center py-3">
        <Link href={`/models/${model.id}`} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
          Detalhes <ExternalLink className="w-3 h-3 ml-1" />
        </Link>
        <div className="flex items-center gap-3">
          {model.apiAvailable && (
            <span className="text-xs flex items-center text-muted-foreground" title={pt.common.apiAvailable}>
              <Cpu className="w-3 h-3 mr-1" /> API
            </span>
          )}
          <label
            className={`text-xs flex items-center gap-1.5 select-none ${
              !selected && !canAddMore ? "text-muted-foreground/40 cursor-not-allowed" : "text-muted-foreground cursor-pointer"
            }`}
            title={selected ? pt.compare.removeFromCompare : pt.compare.addToCompare}
          >
            <Checkbox
              checked={selected}
              disabled={!selected && !canAddMore}
              onCheckedChange={() => toggle(model.id)}
            />
            {pt.compare.compareLabel}
          </label>
        </div>
      </CardFooter>
    </Card>
  );
}
