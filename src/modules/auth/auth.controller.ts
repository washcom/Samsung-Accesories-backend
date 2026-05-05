import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as authService from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await authService.register(name, email, password);

  return sendSuccess(res, result, "Registration successful", 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  if (!result) {
    return sendError(res, "Invalid email or password", 401);
  }

  return sendSuccess(res, result, "Login successful");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess(res, req.user, "Authenticated user fetched");
});
