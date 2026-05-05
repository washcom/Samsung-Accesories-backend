import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import * as paymentController from "./payment.controller";

const router = Router();

const paymentIntentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    amount: z.number().positive(),
    currency: z.string().length(3).optional()
  })
});

const confirmPaymentSchema = z.object({
  body: z.object({
    reference: z.string().min(1)
  })
});

router.use(requireAuth);
router.post("/intents", validate(paymentIntentSchema), paymentController.createPaymentIntent);
router.post("/confirm", validate(confirmPaymentSchema), paymentController.confirmPayment);

export default router;
