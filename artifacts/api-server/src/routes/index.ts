import { Router, type IRouter } from "express";
import healthRouter from "./health";
import providersRouter from "./providers";
import modelsRouter from "./models";
import statsRouter from "./stats";
import metaRouter from "./meta";

const router: IRouter = Router();

router.use(healthRouter);
router.use(providersRouter);
router.use(modelsRouter);
router.use(statsRouter);
router.use(metaRouter);

export default router;
