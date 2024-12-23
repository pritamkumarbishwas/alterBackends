import { Router } from "express";
import Analytics from "./analytics.routes.js";
import Auth from "./auth.routes.js";
import Url from "./url.routes.js";

const router = Router();

router.use("/auth", Auth);
router.use("/url", Url);
router.use("/analytics", Analytics);

export default router;
