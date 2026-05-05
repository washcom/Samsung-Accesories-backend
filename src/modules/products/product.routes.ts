import { Router } from "express";
import { requireAdmin, requireAuth } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import { productSchema, updateProductSchema } from "../../shared/validators/product.validator";
import * as productController from "./product.controller";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", requireAuth, requireAdmin, validate(productSchema), productController.createProduct);
router.patch("/:id", requireAuth, requireAdmin, validate(updateProductSchema), productController.updateProduct);
router.delete("/:id", requireAuth, requireAdmin, productController.deleteProduct);

export default router;
