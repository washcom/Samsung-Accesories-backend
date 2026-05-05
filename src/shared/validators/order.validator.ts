import { z } from "zod";

export const orderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product: z.string().min(1),
        quantity: z.number().int().positive()
      })
    ),
    shippingAddress: z.object({
      line1: z.string().min(2),
      line2: z.string().optional(),
      city: z.string().min(2),
      state: z.string().optional(),
      country: z.string().min(2),
      postalCode: z.string().min(2)
    })
  })
});
