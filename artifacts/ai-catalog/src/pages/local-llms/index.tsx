import { useLanguage } from "@/lib/LanguageContext";
import { localLlmSoftware } from "@/lib/local-llm-software";
import { localizedSoftware } from "@/lib/local-llm-software.i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Download, ExternalLink, Lightbulb } from "lucide-react";

export default function LocalLlmsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Cpu className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide">
            {t.localLlms.softwareHeading}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.localLlms.title}</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">{t.localLlms.subtitle}</p>
        <p className="text-sm text-muted-foreground mt-3 max-w-3xl">{t.localLlms.intro}</p>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
        <span>{t.localLlms.tip}</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {localLlmSoftware.map((software) => {
          const loc = localizedSoftware(software, language);
          return (
          <div
            key={software.id}
            className="flex flex-col rounded-xl border bg-card overflow-hidden"
          >
            <div className="p-5 space-y-3 border-b">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{software.name}</h2>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {loc.license}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{loc.description}</p>
              <div className="flex flex-wrap gap-1">
                {software.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-[10px]">
                    {platform}
                  </Badge>
                ))}
              </div>
              <Button asChild size="sm" className="w-full mt-1">
                <a href={software.website} target="_blank" rel="noopener noreferrer">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  {t.localLlms.visitSite}
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </a>
              </Button>
            </div>
            <div className="p-5 flex-1">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {t.localLlms.modelsAvailable}
              </div>
              <ul className="space-y-1.5 text-sm">
                {loc.models.map((model) => (
                  <li key={model} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    <span>{model}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
