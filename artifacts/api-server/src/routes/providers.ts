import { Router, type IRouter } from "express";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { db, providersTable, modelsTable } from "@workspace/db";
import {
  ListProvidersQueryParams,
  CreateProviderBody,
  GetProviderParams,
  UpdateProviderParams,
  UpdateProviderBody,
  DeleteProviderParams,
  VerifyProviderParams,
} from "@workspace/api-zod";
import { toProviderResponse, toModelResponse } from "../lib/catalog";

const router: IRouter = Router();

router.get("/providers", async (req, res): Promise<void> => {
  const parsed = ListProvidersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { search, isOpenSource, sort } = parsed.data;

  const conditions = [];
  if (search) {
    conditions.push(ilike(providersTable.name, `%${search}%`));
  }
  if (isOpenSource !== undefined) {
    conditions.push(eq(providersTable.isOpenSource, isOpenSource));
  }

  const rows = await db
    .select({
      provider: providersTable,
      modelCount: sql<number>`count(${modelsTable.id})::int`,
    })
    .from(providersTable)
    .leftJoin(modelsTable, eq(modelsTable.providerId, providersTable.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .groupBy(providersTable.id);

  let result = rows.map((row) => toProviderResponse(row.provider, row.modelCount));

  if (sort === "name_desc") {
    result = result.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "recently_updated") {
    result = result.sort(
      (a, b) => new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime(),
    );
  } else if (sort === "model_count_desc") {
    result = result.sort((a, b) => b.modelCount - a.modelCount);
  } else {
    result = result.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.json(result);
});

router.post("/providers", async (req, res): Promise<void> => {
  const parsed = CreateProviderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .insert(providersTable)
    .values({
      ...parsed.data,
      lastVerifiedAt: parsed.data.lastVerifiedAt ? new Date(parsed.data.lastVerifiedAt) : new Date(),
    })
    .returning();

  res.status(201).json(toProviderResponse(row, 0));
});

router.get("/providers/:id", async (req, res): Promise<void> => {
  const params = GetProviderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.id, params.data.id));

  if (!provider) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  const models = await db
    .select()
    .from(modelsTable)
    .where(eq(modelsTable.providerId, provider.id))
    .orderBy(modelsTable.name);

  res.json({
    ...toProviderResponse(provider, models.length),
    models: models.map((m) => toModelResponse(m)),
  });
});

router.patch("/providers/:id", async (req, res): Promise<void> => {
  const params = UpdateProviderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateProviderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { lastVerifiedAt, ...rest } = parsed.data;

  const [row] = await db
    .update(providersTable)
    .set({
      ...rest,
      ...(lastVerifiedAt ? { lastVerifiedAt: new Date(lastVerifiedAt) } : {}),
    })
    .where(eq(providersTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(modelsTable)
    .where(eq(modelsTable.providerId, row.id));

  res.json(toProviderResponse(row, count));
});

router.delete("/providers/:id", async (req, res): Promise<void> => {
  const params = DeleteProviderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(providersTable)
    .where(eq(providersTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  res.sendStatus(204);
});

router.patch("/providers/:id/verify", async (req, res): Promise<void> => {
  const params = VerifyProviderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .update(providersTable)
    .set({ verifiedByAdmin: true, lastVerifiedAt: new Date() })
    .where(eq(providersTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(modelsTable)
    .where(eq(modelsTable.providerId, row.id));

  res.json(toProviderResponse(row, count));
});

export default router;
