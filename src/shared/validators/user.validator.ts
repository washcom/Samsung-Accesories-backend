import { z } from "zod";
import { USER_ROLES } from "../../config/constants";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]).optional(),
    isActive: z.boolean().optional()
  })
});
