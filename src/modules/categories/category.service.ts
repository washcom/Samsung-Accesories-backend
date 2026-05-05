import { Category } from "./category.model";
import { ICategory } from "./category.types";

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const createCategory = (payload: Partial<ICategory>) => {
  return Category.create({ ...payload, slug: payload.slug ?? slugify(payload.name ?? "") });
};

export const findCategories = () => Category.find().sort({ name: 1 });

export const findCategoryById = (id: string) => Category.findById(id);

export const updateCategory = (id: string, payload: Partial<ICategory>) => {
  const nextPayload = { ...payload };

  if (payload.name && !payload.slug) {
    nextPayload.slug = slugify(payload.name);
  }

  return Category.findByIdAndUpdate(id, nextPayload, { new: true, runValidators: true });
};

export const deleteCategory = async (id: string) => Boolean(await Category.findByIdAndDelete(id));
