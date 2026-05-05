import { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as paymentService from "./payment.service";

export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
  const intent = paymentService.createPaymentIntent(
    req.body.orderId,
    req.body.amount,
    req.body.currency
  );
  return sendSuccess(res, intent, "Payment intent created", 201);
});

export const confirmPayment = asyncHandler(async (req: Request, res: Response) => {
  const payment = paymentService.confirmPayment(req.body.reference);
  return sendSuccess(res, payment, "Payment confirmed");
});
