import { Router } from "express";

import * as analyticsController from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/users.auth.middleware.js";
import { rateLimiter } from "../utils/RateLimiter.js";

const router = Router();

router.get("/overall", verifyJWT, analyticsController.overallAnalytics);
router.get("/:alias", verifyJWT, analyticsController.urlAnalytics);
router.get("/topic/:topic", verifyJWT, analyticsController.topicAnalytics);

export default router;
