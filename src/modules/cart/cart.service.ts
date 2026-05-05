import { Types } from "mongoose";
import { Cart } from "./cart.model";

export const getCart = (userId: string) =>
  Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true }
  ).populate("items.product");

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return Cart.create({
      user: userId,
      items: [{ product: new Types.ObjectId(productId), quantity }]
    });
  }

  const item = cart.items.find((entry) => entry.product.toString() === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ product: new Types.ObjectId(productId), quantity });
  }

  await cart.save();
  return cart.populate("items.product");
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return null;
  }

  cart.items = cart.items.filter((entry) => entry.product.toString() !== productId);
  await cart.save();
  return cart.populate("items.product");
};

export const clearCart = (userId: string) =>
  Cart.findOneAndUpdate({ user: userId }, { items: [] }, { new: true });
