import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import * as cartController from "./cart.controller";

const router = Router();

const addToCartSchema = z.object({
  body: z.object({
    product: z.string().min(1),
    quantity: z.number().int().positive().optional()
  })
});

router.use(requireAuth);
router.get("/", cartController.getCart);
router.post("/items", validate(addToCartSchema), cartController.addToCart);
router.delete("/items/:productId", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

export default router;
