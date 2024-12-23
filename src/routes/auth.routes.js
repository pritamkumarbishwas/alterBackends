import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});



router.get("/google", authController.googleLogin);
router.get("/google/callback", authController.googleCallback);

router.get('/login/failure', authController.googleFailure);


export default router;
