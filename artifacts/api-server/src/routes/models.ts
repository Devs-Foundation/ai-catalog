import { Router, type IRouter } from "express";
import { and, eq, ilike, sql, arrayOverlaps } from "drizzle-orm";
import { db, providersTable, modelsTable } from "@workspace/db";
import {
  ListModelsQueryParams,
  CreateModelBody,
  GetModelParams,
  UpdateModelParams,
  UpdateModelBody,
  DeleteModelParams,
  VerifyModelParams,
} from "@workspace/api-zod";
import { toModelResponse, toModelWithProviderResponse, isOutdated } from "../lib/catalog";

const router: IRouter = Router();

router.get("/models", async (req, res): Promise<void> => {
  const parsed = ListModelsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { search, providerId, pricingType, modality, specialty, isOpenSource, apiAvailable, sort } =
    parsed.data;

  const conditions = [];
  if (search) {
    conditions.push(ilike(modelsTable.name, `%${search}%`));
  }
  if (providerId !== undefined) {
    conditions.push(eq(modelsTable.providerId, providerId));
  }
  if (pricingType) {
    const types = pricingType.split(",").map((t) => t.trim()).filter(Boolean);
    if (types.length) {
      conditions.push(
        sql`${modelsTable.pricingType} = ANY(${sql.raw(
          `ARRAY[${types.map((t) => `'${t.replace(/'/g, "")}'`).join(",")}]`,
        )})`,
      );
    }
  }
  if (modality) {
    const modalities = modality.split(",").map((m) => m.trim()).filter(Boolean);
    if (modalities.length) {
      conditions.push(
        sql`(${arrayOverlaps(modelsTable.modalitiesInput, modalities)} OR ${arrayOverlaps(
          modelsTable.modalitiesOutput,
          modalities,
        )})`,
      );
    }
  }
  if (specialty) {
    conditions.push(arrayOverlaps(modelsTable.specialties, [specialty]));
  }
  if (isOpenSource !== undefined) {
    conditions.push(eq(providersTable.isOpenSource, isOpenSource));
  }
  if (apiAvailable !== undefined) {
    conditions.push(eq(modelsTable.apiAvailable, apiAvailable));
  }

  const rows = await db
    .select({ model: modelsTable, provider: providersTable })
    .from(modelsTable)
    .innerJoin(providersTable, eq(modelsTable.providerId, providersTable.id))
    .where(conditions.length ? and(...conditions) : undefined);

  let result = rows.map((row) => toModelWithProviderResponse(row.model, row.provider));

  if (sort === "price_asc") {
    result = result.sort(
      (a, b) => (a.priceInputPerMillionTokens ?? Infinity) - (b.priceInputPerMillionTokens ?? Infinity),
    );
  } else if (sort === "price_desc") {
    result = result.sort(
      (a, b) => (b.priceInputPerMillionTokens ?? -1) - (a.priceInputPerMillionTokens ?? -1),
    );
  } else if (sort === "context_desc") {
    result = result.sort((a, b) => (b.contextWindowTokens ?? 0) - (a.contextWindowTokens ?? 0));
  } else if (sort === "recently_updated") {
    result = result.sort(
      (a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime(),
    );
  } else {
    result = result.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.json(result);
});

router.post("/models", async (req, res): Promise<void> => {
  const parsed = CreateModelBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .insert(modelsTable)
    .values({
      ...parsed.data,
      lastUpdatedAt: parsed.data.lastUpdatedAt ?? new Date(),
    })
    .returning();

  res.status(201).json(toModelResponse(row));
});

router.get("/models/:id", async (req, res): Promise<void> => {
  const params = GetModelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select({ model: modelsTable, provider: providersTable })
    .from(modelsTable)
    .innerJoin(providersTable, eq(modelsTable.providerId, providersTable.id))
    .where(eq(modelsTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Model not found" });
    return;
  }

  res.json(toModelWithProviderResponse(row.model, row.provider));
});

router.patch("/models/:id", async (req, res): Promise<void> => {
  const params = UpdateModelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateModelBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(modelsTable)
    .set(parsed.data)
    .where(eq(modelsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Model not found" });
    return;
  }

  res.json(toModelResponse(row));
});

router.delete("/models/:id", async (req, res): Promise<void> => {
  const params = DeleteModelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(modelsTable)
    .where(eq(modelsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Model not found" });
    return;
  }

  res.sendStatus(204);
});

router.patch("/models/:id/verify", async (req, res): Promise<void> => {
  const params = VerifyModelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .update(modelsTable)
    .set({ verifiedByAdmin: true, lastUpdatedAt: new Date() })
    .where(eq(modelsTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Model not found" });
    return;
  }

  res.json(toModelResponse(row));
});

export default router;
