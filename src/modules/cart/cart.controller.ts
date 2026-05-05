import { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as cartService from "./cart.service";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.user!._id.toString());
  return sendSuccess(res, cart, "Cart fetched");
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.addToCart(
    req.user!._id.toString(),
    req.body.product,
    req.body.quantity ?? 1
  );
  return sendSuccess(res, cart, "Item added to cart");
});

export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.removeFromCart(req.user!._id.toString(), req.params.productId);
  return sendSuccess(res, cart, "Item removed from cart");
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.clearCart(req.user!._id.toString());
  return sendSuccess(res, cart, "Cart cleared");
});
