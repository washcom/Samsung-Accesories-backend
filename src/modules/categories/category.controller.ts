import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import * as categoryService from "./category.service";

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  return sendSuccess(res, category, "Category created", 201);
});

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.findCategories();
  return sendSuccess(res, categories, "Categories fetched");
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.findCategoryById(req.params.id);
  return category
    ? sendSuccess(res, category, "Category fetched")
    : sendError(res, "Category not found", 404);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  return category
    ? sendSuccess(res, category, "Category updated")
    : sendError(res, "Category not found", 404);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await categoryService.deleteCategory(req.params.id);
  return deleted
    ? sendSuccess(res, null, "Category deleted")
    : sendError(res, "Category not found", 404);
});
