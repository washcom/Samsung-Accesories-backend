import { Router } from "express";
import { requireAuth, requireRole } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import { USER_ROLES } from "../../config/constants";
import { updateUserSchema } from "../../shared/validators/user.validator";
import * as userController from "./user.controller";

const router = Router();

router.use(requireAuth, requireRole(USER_ROLES.ADMIN));
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.patch("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
