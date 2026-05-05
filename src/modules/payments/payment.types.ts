import { PAYMENT_STATUSES } from "../../config/constants";

export type PaymentStatus = (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];

export interface PaymentIntent {
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  reference: string;
}
