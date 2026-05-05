import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../../shared/validators/user.validator";
import { requireAuth } from "./auth.middleware";
import * as authController from "./auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", requireAuth, authController.me);

export default router;
