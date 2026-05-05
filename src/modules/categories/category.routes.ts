import { Router } from "express";
import { requireAdmin, requireAuth } from "../../shared/middlewares/auth.middleware";
import * as categoryController from "./category.controller";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", requireAuth, requireAdmin, categoryController.createCategory);
router.patch("/:id", requireAuth, requireAdmin, categoryController.updateCategory);
router.delete("/:id", requireAuth, requireAdmin, categoryController.deleteCategory);

export default router;
