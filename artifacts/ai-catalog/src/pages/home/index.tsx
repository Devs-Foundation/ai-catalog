import { useState } from "react";
import { useGetStatsSummary, useListModels, useListSpecialties, ListModelsParams } from "@workspace/api-client-react";
import { ModelCard } from "@/components/models/ModelCard";
import { ModelFilters } from "@/components/models/ModelFilters";
import { useLanguage } from "@/lib/LanguageContext";
import { Database, Server, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<ListModelsParams>({
    sort: "recently_updated"
  });

  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: specialties } = useListSpecialties();
  const { data: models, isLoading: modelsLoading } = useListModels(filters);

  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {t.dashboard.heroTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t.dashboard.heroTitleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.dashboard.heroSubtitle}
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 pt-4">
          <StatCard 
            title={t.dashboard.stats.totalModels} 
            value={statsLoading ? null : stats?.totalModels} 
            icon={<Database className="w-4 h-4" />}
          />
          <StatCard 
            title={t.dashboard.stats.totalProviders} 
            value={statsLoading ? null : stats?.totalProviders} 
            icon={<Server className="w-4 h-4" />}
          />
          <StatCard 
            title={t.dashboard.stats.openSourceProviders} 
            value={statsLoading ? null : stats?.openSourceProviders} 
            icon={<ShieldCheck className="w-4 h-4" />}
            highlight
          />
        </div>
      </section>

      <section className="space-y-6">
        <ModelFilters 
          filters={filters} 
          setFilters={setFilters} 
          specialties={specialties || []}
        />

        <div className="min-h-[400px]">
          {modelsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : models && models.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {models.map(model => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center border rounded-xl border-dashed bg-muted/20">
              <Database className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium">{t.common.empty}</h3>
              <p className="text-muted-foreground mt-1">{t.dashboard.adjustFiltersHint}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, highlight, danger }: { title: string, value: number | null | undefined, icon: React.ReactNode, highlight?: boolean, danger?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between
      ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-card'}
      ${danger ? 'bg-destructive/5 border-destructive/20 text-destructive' : ''}
    `}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
        {icon}
        <span className={danger ? 'text-destructive' : ''}>{title}</span>
      </div>
      <div className="text-3xl font-bold">
        {value === null || value === undefined ? <Skeleton className="h-8 w-16" /> : value}
      </div>
    </div>
  );
}
