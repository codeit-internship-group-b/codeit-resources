import { type ICategory } from "@repo/types/categoryType";
import { Schema, type Document, model } from "mongoose";

interface CategoryDoc extends Omit<ICategory, "_id">, Document {}

const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, unique: true, required: true, trim: true },
    itemType: { type: String, required: true, enum: ["room", "equipment"] },
  },
  {
    timestamps: true,
  },
);

export const Category = model("Category", CategorySchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: 카테고리 ID
 *         name:
 *           type: string
 *           description: 카테고리 이름
 *           example: "회의실"
 *         itemType:
 *           type: string
 *           enum: ["room", "equipment"]
 *           description: 아이템 타입
 *           example: "room"
 */
