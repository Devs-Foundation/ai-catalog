import { useRoute } from "wouter";
import { useGetProvider, useListModels } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Code, Building, Server, CalendarClock } from "lucide-react";
import { ModelCard } from "@/components/models/ModelCard";
import { format } from "date-fns";

export default function ProviderDetailPage() {
  const [, params] = useRoute("/providers/:id");
  const id = Number(params?.id);
  const { t } = useLanguage();

  const { data: provider, isLoading, isError } = useGetProvider(id);
  const { data: models, isLoading: modelsLoading } = useListModels({ providerId: id });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !provider) {
    return <div className="text-center py-20 text-destructive">{t.common.error}</div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Section */}
      <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              {provider.logoUrl ? (
                <img src={provider.logoUrl} alt={provider.name} className="w-12 h-12 rounded object-contain bg-white" />
              ) : (
                <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {provider.name.charAt(0)}
                </div>
              )}
              <h1 className="text-3xl font-bold tracking-tight">{provider.name}</h1>
              {provider.isOpenSource && (
                <Badge className="ml-2 bg-green-600/20 text-green-500 border-none hover:bg-green-600/30">
                  <Code className="w-3 h-3 mr-1" /> {t.common.openSource}
                </Badge>
              )}
              {provider.verifiedByAdmin && (
                <Badge variant="outline" className="ml-2 border-primary text-primary">
                  {t.common.verified}
                </Badge>
              )}
            </div>
            
            <p className="text-lg text-muted-foreground">
              {provider.description || t.common.notAvailable}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              {provider.headquarters && (
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1.5" />
                  {provider.headquarters}
                </div>
              )}
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-1.5" />
                {provider.modelCount} {t.providers.fields.modelCount}
              </div>
              <div className="flex items-center">
                <CalendarClock className="w-4 h-4 mr-1.5" />
                {t.providers.detail.updatedLabel} {format(new Date(provider.lastVerifiedAt), "dd/MM/yyyy")}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px]">
            {provider.websiteUrl && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.providers.fields.website}
                </a>
              </Button>
            )}
            {provider.pricingUrl && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={provider.pricingUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.providers.fields.pricing}
                </a>
              </Button>
            )}
            {provider.docsUrl && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.providers.fields.docs}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Models Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t.providers.detail.modelsHeading} ({provider.modelCount})</h2>
        </div>
        
        {modelsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
          </div>
        ) : models && models.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map(model => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-xl bg-muted/10 text-muted-foreground">
            {t.providers.detail.noModelsFound}
          </div>
        )}
      </div>
    </div>
  );
}
