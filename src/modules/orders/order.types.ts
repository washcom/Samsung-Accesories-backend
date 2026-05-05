import { Document, Types } from "mongoose";
import { ORDER_STATUSES } from "../../config/constants";

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  total: number;
  status: OrderStatus;
}
