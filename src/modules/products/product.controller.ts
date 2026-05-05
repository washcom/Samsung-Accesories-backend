import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as productService from "./product.service";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  return sendSuccess(res, product, "Product created", 201);
});

export const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await productService.findProducts();
  return sendSuccess(res, products, "Products fetched");
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.findProductById(req.params.id);
  return product ? sendSuccess(res, product, "Product fetched") : sendError(res, "Product not found", 404);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  return product ? sendSuccess(res, product, "Product updated") : sendError(res, "Product not found", 404);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await productService.deleteProduct(req.params.id);
  return deleted ? sendSuccess(res, null, "Product deleted") : sendError(res, "Product not found", 404);
});
