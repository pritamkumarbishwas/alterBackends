import { Router } from "express";

import { verifyJWT } from "../middlewares/users.auth.middleware.js";
import * as urlController from "../controllers/url.controller.js";
import { rateLimiter } from "../utils/RateLimiter.js";

const router = Router();

router.post("/shorten", verifyJWT, rateLimiter, urlController.createShortUrl);
router.get("/shorten/:alias", urlController.redirectShortUrl);

export default router;
