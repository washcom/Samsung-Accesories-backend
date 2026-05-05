import { Router } from "express";
import { z } from "zod";
import { ORDER_STATUSES } from "../../config/constants";
import { requireAdmin, requireAuth } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import { orderSchema } from "../../shared/validators/order.validator";
import * as orderController from "./order.controller";

const router = Router();

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      ORDER_STATUSES.PENDING,
      ORDER_STATUSES.PAID,
      ORDER_STATUSES.SHIPPED,
      ORDER_STATUSES.DELIVERED,
      ORDER_STATUSES.CANCELLED
    ])
  })
});

router.use(requireAuth);
router.post("/", validate(orderSchema), orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrder);
router.patch("/:id/status", requireAdmin, validate(updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;
