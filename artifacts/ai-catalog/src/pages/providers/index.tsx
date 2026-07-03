import { useListProviders } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/LanguageContext";
import { providerDescription } from "@/lib/contentI18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function ProvidersPage() {
  const { t, language } = useLanguage();
  const { data: providers, isLoading, isError } = useListProviders();

  if (isLoading) return <div>{t.common.loading}</div>;
  if (isError) return <div>{t.common.error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.app.nav.providers}</h1>
        <p className="text-muted-foreground">{t.providers.listSubtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {providers?.map((provider) => (
          <Link key={provider.id} href={`/providers/${provider.id}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{provider.name}</CardTitle>
                  {provider.isOpenSource && (
                    <Badge variant="secondary">{t.common.openSource}</Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {providerDescription(provider.slug, language, provider.description) || t.common.notAvailable}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mt-2">
                  {provider.modelCount} {t.providers.fields.modelCount}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
