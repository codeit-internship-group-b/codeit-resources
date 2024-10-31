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

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: 모든 카테고리 조회
 *     description: 모든 카테고리 정보를 조회합니다.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 카테고리 ID
 *                   name:
 *                     type: string
 *                     description: 카테고리 이름
 *                   itemType:
 *                     type: string
 *                     enum: ["room", "equipment"]
 *                     description: 아이템 타입
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: 카테고리 추가
 *     description: 새로운 카테고리를 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 카테고리 이름
 *               itemType:
 *                 type: string
 *                 enum: ["room", "equipment"]
 *                 description: 아이템 타입
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: 추가된 카테고리 ID
 *                 name:
 *                   type: string
 *                   description: 추가된 카테고리 이름
 *                 itemType:
 *                   type: string
 *                   enum: ["room", "equipment"]
 *                   description: 아이템 타입
 *       400:
 *         description: 유효하지 않은 카테고리 타입이거나 이미 존재하는 카테고리 이름입니다.
 */
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

/**
 * @swagger
 * /categories/{categoryId}:
 *   patch:
 *     tags: [Categories]
 *     summary: 카테고리 이름 수정
 *     description: 특정 카테고리의 이름을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 카테고리의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 새로운 카테고리 이름
 *     responses:
 *       200:
 *         description: 카테고리 이름이 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: 수정된 카테고리 ID
 *                 name:
 *                   type: string
 *                   description: 수정된 카테고리 이름
 *       400:
 *         description: 유효하지 않은 카테고리 ID 또는 이미 존재하는 카테고리 이름입니다.
 *       404:
 *         description: 카테고리를 찾을 수 없습니다.
 */
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

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     tags: [Categories]
 *     summary: 카테고리 삭제
 *     description: 특정 카테고리를 삭제합니다. 하위 아이템에 예약이 존재하는 경우 삭제할 수 없습니다.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 카테고리의 ID
 *     responses:
 *       200:
 *         description: 카테고리와 하위 아이템이 성공적으로 삭제되었습니다.
 *       400:
 *         description: 카테고리 하위 아이템에 예약이 존재합니다.
 *       404:
 *         description: 카테고리를 찾을 수 없습니다.
 */
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
