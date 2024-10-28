import { type ICategory } from "@repo/types/categoryType";
import { Schema, type Document, model } from "mongoose";

interface CategoryDoc extends Omit<ICategory, "_id">, Document {}

const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, unique: true, required: true, trim: true },
    type: { type: String, required: true, enum: ["room", "equipment"] },
  },
  {
    timestamps: true,
  },
);

export const Category = model("Category", CategorySchema);
