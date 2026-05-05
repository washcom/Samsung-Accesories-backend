import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { USER_ROLES } from "../../config/constants";
import { User } from "../../modules/users/user.model";
import { UserRole } from "../../modules/users/user.types";
import { sendError } from "../utils/apiResponse";

interface JwtPayload {
  sub: string;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return sendError(res, "Authentication required", 401);
  }

  try {
    const token = header.slice("Bearer ".length);
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const user = await User.findById(payload.sub);

    if (!user || !user.isActive) {
      return sendError(res, "Authentication required", 401);
    }

    req.user = user;
    next();
  } catch {
    return sendError(res, "Invalid or expired token", 401);
  }
};

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, "Authentication required", 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, "Forbidden", 403);
    }

    next();
  };

export const requireAdmin = requireRole(USER_ROLES.ADMIN);
