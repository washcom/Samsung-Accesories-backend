import { FilterQuery } from "mongoose";
import { Product } from "./product.model";
import { IProduct } from "./product.types";

export const createProduct = (payload: Partial<IProduct>) => Product.create(payload);

export const findProducts = (filter: FilterQuery<IProduct> = {}) =>
  Product.find({ isActive: true, ...filter }).populate("category").sort({ createdAt: -1 });

export const findProductById = (id: string) => Product.findById(id).populate("category");

export const updateProduct = (id: string, payload: Partial<IProduct>) =>
  Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

export const deleteProduct = async (id: string) => Boolean(await Product.findByIdAndDelete(id));
