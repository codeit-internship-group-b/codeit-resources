import { type Request, type Response } from "express";
import { type ICategory } from "@repo/types/categoryType";
import { startSession } from "mongoose";
import { Category } from "../models/categoryModel";
import isObjectIdValid from "../utils/isObjectIdValid";
import { Item, Reservation } from "../models";

interface CategoryRequestBody {
  name: string;
  itemType: "room" | "equipment";
}

// 모든 카테고리 조회
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

// 카테고리 추가
export const createCategory = async (
  req: Request<unknown, ICategory, CategoryRequestBody>,
  res: Response,
): Promise<void> => {
  const { name, itemType } = req.body;

  if (!["room", "equipment"].includes(itemType)) {
    res.status(400).json({ message: "유효하지 않은 카테고리 타입입니다." });
    return;
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400).json({ message: "이미 존재하는 카테고리 이름입니다." });
    return;
  }

  const newCategory = new Category({ name, itemType });
  await newCategory.save();
  res.status(201).json(newCategory);
};

// 카테고리 이름 수정
export const updateCategory = async (
  req: Request<{ categoryId: string }, ICategory, Partial<CategoryRequestBody>>,
  res: Response,
): Promise<void> => {
  const { categoryId } = req.params;
  const { name } = req.body;

  if (!isObjectIdValid(categoryId)) {
    res.status(400).json({ message: "유효하지 않은 카테고리 ID입니다." });
    return;
  }

  const existingCategory = await Category.findOne({ name, _id: { $ne: categoryId } });
  if (existingCategory) {
    res.status(400).json({ message: "이미 존재하는 카테고리 이름입니다." });
    return;
  }

  const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true, runValidators: true });

  if (!updatedCategory) {
    res.status(404).json({ message: "카테고리를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json(updatedCategory);
};

// 카테고리 삭제
export const deleteCategory = async (req: Request<{ categoryId: string }>, res: Response): Promise<void> => {
  const { categoryId } = req.params;

  if (!isObjectIdValid(categoryId)) {
    res.status(400).json({ message: "유효하지 않은 카테고리 ID입니다." });
    return;
  }

  const session = await startSession();
  session.startTransaction();

  const itemIds = await Item.find({ category: categoryId }, { _id: 1 }).session(session);
  const reservedItems = await Reservation.exists({ item: { $in: itemIds } }).session(session);
  if (reservedItems) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({
      message: "카테고리 하위 아이템에 예약이 존재합니다.",
    });
    return;
  }
  await Item.deleteMany({ category: categoryId }).session(session);
  const deletedCategory = await Category.findByIdAndDelete(categoryId).session(session);

  if (!deletedCategory) {
    await session.abortTransaction();
    await session.endSession();
    res.status(404).json({ message: "카테고리를 찾을 수 없습니다." });
    return;
  }

  await session.commitTransaction();
  await session.endSession();
  res.status(200).json({ message: "카테고리와 하위 아이템이 성공적으로 삭제되었습니다." });
};
