import { Router, type IRouter } from "express";
import { db, modelsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/meta/specialties", async (_req, res): Promise<void> => {
  const rows = await db.select({ specialties: modelsTable.specialties }).from(modelsTable);
  const set = new Set<string>();
  for (const row of rows) {
    for (const specialty of row.specialties) {
      set.add(specialty);
    }
  }
  res.json(Array.from(set).sort((a, b) => a.localeCompare(b)));
});

export default router;
