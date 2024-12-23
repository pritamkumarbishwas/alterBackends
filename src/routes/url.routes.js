import { Router } from "express";

import { verifyJWT } from "../middlewares/users.auth.middleware.js";
import * as urlController from "../controllers/url.controller.js";
import { rateLimiter } from "../utils/RateLimiter.js";
import validate from "../middlewares/validate.js";
import * as urlValidation from "../validations/url.validation.js";

const router = Router();

router.post(
  "/shorten",
  verifyJWT,
  rateLimiter,
  validate(urlValidation.createShortUrl),
  urlController.createShortUrl
);

router.get(
  "/shorten/:alias",
  validate(urlValidation.redirectShortUrl),
  urlController.redirectShortUrl
);

export default router;
