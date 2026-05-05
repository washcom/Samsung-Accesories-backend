import { model, Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
