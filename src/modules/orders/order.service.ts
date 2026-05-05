import { ORDER_STATUSES } from "../../config/constants";
import { Product } from "../products/product.model";
import { Order } from "./order.model";
import { ShippingAddress } from "./order.types";

interface CreateOrderItem {
  product: string;
  quantity: number;
}

export const createOrder = async (
  userId: string,
  items: CreateOrderItem[],
  shippingAddress: ShippingAddress
) => {
  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  const orderItems = items.map((item) => {
    const product = products.find((entry) => entry._id.toString() === item.product);

    if (!product) {
      throw Object.assign(new Error(`Product not found: ${item.product}`), { statusCode: 404 });
    }

    if (product.stock < item.quantity) {
      throw Object.assign(new Error(`Insufficient stock: ${product.name}`), { statusCode: 400 });
    }

    return {
      product: product._id,
      quantity: item.quantity,
      price: product.price
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    total,
    status: ORDER_STATUSES.PENDING
  });
};

export const findOrders = (userId?: string) => {
  const filter = userId ? { user: userId } : {};
  return Order.find(filter).populate("items.product").sort({ createdAt: -1 });
};

export const findOrderById = (id: string) => Order.findById(id).populate("items.product");

export const updateOrderStatus = (id: string, status: string) =>
  Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
