export const API_PREFIX = "/api/v1";

export const USER_ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer"
} as const;

export const ORDER_STATUSES = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled"
} as const;

export const PAYMENT_STATUSES = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed"
} as const;
