import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as userService from "./user.service";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.findUsers();
  return sendSuccess(res, users, "Users fetched");
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findUserById(req.params.id);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, user, "User fetched");
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, user, "User updated");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await userService.deleteUser(req.params.id);

  if (!deleted) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, null, "User deleted");
});
