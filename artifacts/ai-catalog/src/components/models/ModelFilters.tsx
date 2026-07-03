import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/LanguageContext";
import { specialtyLabel } from "@/lib/translations";
import { Search } from "lucide-react";
import { ListModelsParams } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

interface ModelFiltersProps {
  filters: ListModelsParams;
  setFilters: (filters: ListModelsParams) => void;
  specialties?: string[];
}

export function ModelFilters({ filters, setFilters, specialties = [] }: ModelFiltersProps) {
  const { t, language } = useLanguage();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value || undefined });
  };

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="space-y-2">
          <Label>{t.common.search}</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={t.filters.searchPlaceholder} 
              className="pl-9"
              value={filters.search || ""}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Pricing Type */}
        <div className="space-y-2">
          <Label>{t.filters.pricingLicense}</Label>
          <Select 
            value={filters.pricingType || "all"} 
            onValueChange={(val) => setFilters({ ...filters, pricingType: val === "all" ? undefined : val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.all} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.common.all}</SelectItem>
              <SelectItem value="free">{t.models.pricingType.free}</SelectItem>
              <SelectItem value="paid">{t.models.pricingType.paid}</SelectItem>
              <SelectItem value="freemium">{t.models.pricingType.freemium}</SelectItem>
              <SelectItem value="open_source">{t.models.pricingType.open_source}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label>{t.filters.sortLabel}</Label>
          <Select 
            value={filters.sort || "recently_updated"} 
            onValueChange={(val: any) => setFilters({ ...filters, sort: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.filters.sortOptions.recentlyUpdated} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently_updated">{t.filters.sortOptions.recentlyUpdated}</SelectItem>
              <SelectItem value="name_asc">{t.filters.sortOptions.nameAsc}</SelectItem>
              <SelectItem value="price_asc">{t.filters.sortOptions.priceAsc}</SelectItem>
              <SelectItem value="price_desc">{t.filters.sortOptions.priceDesc}</SelectItem>
              <SelectItem value="context_desc">{t.filters.sortOptions.contextDesc}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toggles */}
        <div className="flex flex-col justify-center space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="open-source" className="text-sm cursor-pointer">{t.filters.openSourceOnly}</Label>
            <Switch 
              id="open-source" 
              checked={filters.isOpenSource || false}
              onCheckedChange={(c) => setFilters({ ...filters, isOpenSource: c || undefined })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="api-available" className="text-sm cursor-pointer">{t.filters.apiOnly}</Label>
            <Switch 
              id="api-available" 
              checked={filters.apiAvailable || false}
              onCheckedChange={(c) => setFilters({ ...filters, apiAvailable: c || undefined })}
            />
          </div>
        </div>
      </div>

      {specialties.length > 0 && (
        <div className="pt-2 border-t mt-4">
          <Label className="mb-2 block">{t.filters.specialties}</Label>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={!filters.specialty ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilters({ ...filters, specialty: undefined })}
            >
              {t.common.all}
            </Badge>
            {specialties.map(spec => (
              <Badge 
                key={spec}
                variant={filters.specialty === spec ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilters({ ...filters, specialty: spec })}
              >
                {specialtyLabel(spec, language)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
