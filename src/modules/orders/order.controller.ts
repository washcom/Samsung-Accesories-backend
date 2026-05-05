import { Request, Response } from "express";
import { USER_ROLES } from "../../config/constants";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as orderService from "./order.service";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(
    req.user!._id.toString(),
    req.body.items,
    req.body.shippingAddress
  );
  return sendSuccess(res, order, "Order created", 201);
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.role === USER_ROLES.ADMIN ? undefined : req.user!._id.toString();
  const orders = await orderService.findOrders(userId);
  return sendSuccess(res, orders, "Orders fetched");
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.findOrderById(req.params.id);

  if (!order) {
    return sendError(res, "Order not found", 404);
  }

  if (
    req.user?.role !== USER_ROLES.ADMIN &&
    order.user.toString() !== req.user!._id.toString()
  ) {
    return sendError(res, "Forbidden", 403);
  }

  return sendSuccess(res, order, "Order fetched");
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  return order ? sendSuccess(res, order, "Order updated") : sendError(res, "Order not found", 404);
});
