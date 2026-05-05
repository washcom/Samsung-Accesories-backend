import { PAYMENT_STATUSES } from "../../config/constants";
import { PaymentIntent } from "./payment.types";

export const createPaymentIntent = (
  orderId: string,
  amount: number,
  currency = "USD"
): PaymentIntent => ({
  orderId,
  amount,
  currency,
  status: PAYMENT_STATUSES.PENDING,
  reference: `pay_${Date.now()}_${Math.round(Math.random() * 1e6)}`
});

export const confirmPayment = (reference: string): PaymentIntent => ({
  orderId: "external",
  amount: 0,
  currency: "USD",
  status: PAYMENT_STATUSES.COMPLETED,
  reference
});
