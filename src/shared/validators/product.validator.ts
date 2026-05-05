import { z } from "zod";

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category: z.string().min(1),
    images: z.array(z.string().url()).optional()
  })
});

export const updateProductSchema = z.object({
  body: productSchema.shape.body.partial()
});
