import { type Request, type Response } from "express";
import { type ICategory } from "@repo/types/categoryType";
import { Category } from "../models/categoryModel";

// 유효성 검사 함수
const isObjectIdValid = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

interface CategoryRequestBody {
  name: string;
  itemType: "room" | "equipment";
}

// 모든 카테고리 조회
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "카테고리 조회에 실패했습니다.", error });
  }
};

// 특정 카테고리 조회
export const getCategoryById = async (
  req: Request<{ categoryId: string }, ICategory>,
  res: Response,
): Promise<void> => {
  const { categoryId } = req.params;

  if (!isObjectIdValid(categoryId)) {
    res.status(400).json({ message: "유효하지 않은 카테고리 ID입니다." });
    return;
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).json({ message: "카테고리를 찾을 수 없습니다." });
    return;
  }
  res.status(200).json(category);
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

  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    res.status(404).json({ message: "카테고리를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "카테고리가 성공적으로 삭제되었습니다." });
};
