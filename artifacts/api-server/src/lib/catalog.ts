import type { ProviderRow, ModelRow } from "@workspace/db";

const OUTDATED_THRESHOLD_DAYS = 120;

export function isOutdated(lastUpdatedAt: Date): boolean {
  const ageMs = Date.now() - lastUpdatedAt.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return ageDays > OUTDATED_THRESHOLD_DAYS;
}

export function toProviderResponse(row: ProviderRow, modelCount: number) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    websiteUrl: row.websiteUrl,
    pricingUrl: row.pricingUrl,
    docsUrl: row.docsUrl,
    logoUrl: row.logoUrl,
    isOpenSource: row.isOpenSource,
    headquarters: row.headquarters,
    modelCount,
    lastVerifiedAt: row.lastVerifiedAt,
    verifiedByAdmin: row.verifiedByAdmin,
    createdAt: row.createdAt,
  };
}

export function toModelResponse(row: ModelRow) {
  return {
    id: row.id,
    providerId: row.providerId,
    slug: row.slug,
    name: row.name,
    description: row.description,
    pricingType: row.pricingType,
    priceInputPerMillionTokens: row.priceInputPerMillionTokens,
    priceOutputPerMillionTokens: row.priceOutputPerMillionTokens,
    priceUnit: row.priceUnit,
    priceNotes: row.priceNotes,
    contextWindowTokens: row.contextWindowTokens,
    maxOutputTokens: row.maxOutputTokens,
    modalitiesInput: row.modalitiesInput,
    modalitiesOutput: row.modalitiesOutput,
    specialties: row.specialties,
    usageLimits: row.usageLimits,
    apiAvailable: row.apiAvailable,
    officialLink: row.officialLink,
    releaseDate: row.releaseDate,
    lastUpdatedAt: row.lastUpdatedAt,
    verifiedByAdmin: row.verifiedByAdmin,
    isPotentiallyOutdated: isOutdated(row.lastUpdatedAt),
    createdAt: row.createdAt,
  };
}

export function toModelWithProviderResponse(row: ModelRow, provider: ProviderRow) {
  return {
    ...toModelResponse(row),
    providerName: provider.name,
    providerSlug: provider.slug,
    providerIsOpenSource: provider.isOpenSource,
    providerLogoUrl: provider.logoUrl,
  };
}
