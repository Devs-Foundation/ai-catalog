import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, providersTable, modelsTable } from "@workspace/db";
import { toModelWithProviderResponse, isOutdated } from "../lib/catalog";

const router: IRouter = Router();

router.get("/stats/summary", async (_req, res): Promise<void> => {
  const [{ totalProviders }] = await db
    .select({ totalProviders: sql<number>`count(*)::int` })
    .from(providersTable);

  const [{ totalModels }] = await db
    .select({ totalModels: sql<number>`count(*)::int` })
    .from(modelsTable);

  const [{ openSourceProviders }] = await db
    .select({ openSourceProviders: sql<number>`count(*)::int` })
    .from(providersTable)
    .where(eq(providersTable.isOpenSource, true));

  const pricingRows = await db
    .select({
      pricingType: modelsTable.pricingType,
      count: sql<number>`count(*)::int`,
    })
    .from(modelsTable)
    .groupBy(modelsTable.pricingType);

  const allModels = await db.select().from(modelsTable);

  const modalityCounts = new Map<string, number>();
  for (const model of allModels) {
    const modalities = new Set([...model.modalitiesInput, ...model.modalitiesOutput]);
    for (const modality of modalities) {
      modalityCounts.set(modality, (modalityCounts.get(modality) ?? 0) + 1);
    }
  }

  const potentiallyOutdatedCount = allModels.filter((m) => isOutdated(m.lastUpdatedAt)).length;

  const recentRows = await db
    .select({ model: modelsTable, provider: providersTable })
    .from(modelsTable)
    .innerJoin(providersTable, eq(modelsTable.providerId, providersTable.id))
    .orderBy(desc(modelsTable.lastUpdatedAt))
    .limit(8);

  res.json({
    totalProviders,
    totalModels,
    openSourceProviders,
    pricingBreakdown: pricingRows.map((r) => ({ pricingType: r.pricingType, count: r.count })),
    modalityBreakdown: Array.from(modalityCounts.entries()).map(([modality, count]) => ({
      modality,
      count,
    })),
    recentlyUpdatedModels: recentRows.map((r) => toModelWithProviderResponse(r.model, r.provider)),
    potentiallyOutdatedCount,
  });
});

export default router;
