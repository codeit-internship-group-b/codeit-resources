import { type Request, type Response } from "express";
import { type IRoom, type ISeat, type IEquipment } from "@repo/types/itemType";
import { Item, Room, Seat, Equipment } from "../models";
import isObjectIdValid from "../utils/isObjectIdValid";

interface ItemRequestBody {
  name: string;
  description?: string;
  status?: string;
  user?: string;
  imageUrl?: string;
  category?: string;
  capacity?: string;
  location?: string;
}

/**
 * @swagger
 * /items/{itemType}:
 *   get:
 *     tags: [Items]
 *     summary: 특정 타입의 아이템 조회
 *     description: 아이템 타입(room, seat, equipment)에 따라 아이템 목록을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: itemType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [room, seat, equipment]
 *         description: 조회할 아이템 타입
 *     responses:
 *       200:
 *         description: 성공적으로 아이템 목록을 가져왔습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: 아이템의 고유 식별자
 *                   name:
 *                     type: string
 *                     description: 아이템 이름
 *                   itemType:
 *                     type: string
 *                     enum: [room, seat, equipment]
 *                     description: 아이템 유형
 *       400:
 *         description: 잘못된 타입 요청입니다.
 */
export const getAllItems = async (
  req: Request<{ itemType: "room" | "seat" | "equipment" | null }>,
  res: Response,
): Promise<void> => {
  const { itemType } = req.params;

  let items;
  if (itemType) {
    switch (itemType) {
      case "room":
        items = await Room.find().populate("category", "name");
        break;
      case "seat":
        items = await Seat.find().populate("user", "name");
        break;
      case "equipment":
        items = await Equipment.find().populate("category", "name");
        break;
      default:
        res.status(400).json({ message: "유효하지 않은 타입입니다." });
        return;
    }
  } else {
    items = await Item.find().populate("category", "name");
  }
  res.status(200).json(items);
};

/**
 * @swagger
 * /items/{itemType}:
 *   post:
 *     tags: [Items]
 *     summary: 새로운 아이템 생성
 *     description: 새로운 방, 좌석, 장비 아이템을 생성합니다.
 *     parameters:
 *       - in: path
 *         name: itemType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [room, seat, equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: 아이템 이름
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, in-use, maintenance]
 *                 description:
 *                   - available: 사용 가능
 *                   - in-use: 사용 중
 *                   - maintenance: 점검 중
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               capacity:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: 아이템이 생성되었습니다.
 *       400:
 *         description: 필수 필드가 누락되었거나 이미 존재하는 아이템 이름입니다.
 */
export const createItem = async (
  req: Request<{ itemType: "room" | "seat" | "equipment" }, IRoom | ISeat | IEquipment, ItemRequestBody>,
  res: Response,
): Promise<void> => {
  const { itemType } = req.params;
  const { name, description, status, imageUrl, category, capacity, location } = req.body;

  if (!name) {
    res.status(400).json({ message: "필수 필드가 누락되었습니다." });
    return;
  }

  const nameExists = await Item.exists({ name });
  if (nameExists) {
    res.status(400).json({ message: "이미 등록된 아이템 이름입니다." });
    return;
  }

  let createdItem;
  switch (itemType) {
    case "room":
      createdItem = await Room.create({ name, description, status, imageUrl, category, capacity, location });
      break;
    case "seat":
      createdItem = await Seat.create({ name, description, status, imageUrl });
      break;
    case "equipment":
      createdItem = await Equipment.create({ name, description, status, imageUrl, category });
      break;
    default:
      res.status(400).json({ message: "유효하지 않은 타입입니다." });
      return;
  }

  res.status(201).json({ message: `${itemType}이 생성되었습니다.`, createdItem });
};

/**
 * @swagger
 * /items/{itemId}:
 *   patch:
 *     tags: [Items]
 *     summary: 아이템 정보 수정
 *     description: 아이템 정보를 수정합니다.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: 아이템 이름
 *                 minLength: 1
 *                 maxLength: 100
 *               status:
 *                 type: string
 *                 enum: [available, in-use, maintenance]
 *                 description:
 *                   - available: 사용 가능
 *                   - in-use: 사용 중
 *                   - maintenance: 점검 중
 *               user:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: 아이템 정보가 업데이트되었습니다.
 *       400:
 *         description: 잘못된 아이템 ID 또는 요청 데이터 오류.
 */
export const updateItem = async (
  req: Request<{ itemId: string }, IRoom | ISeat | IEquipment, Partial<ItemRequestBody>>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;

  if (!isObjectIdValid(itemId)) {
    res.status(400).json({ message: "유효하지 않은 아이템 ID입니다." });
    return;
  }

  const { name, status, user, description, imageUrl, category, location, capacity } = req.body;

  const target = await Item.findById(itemId);
  if (!target) {
    res.status(404).json({ message: "해당 아이템을 찾을 수 없습니다." });
    return;
  }

  let updatedItem;

  switch (target.itemType) {
    case "room":
      updatedItem = await Room.findByIdAndUpdate(
        itemId,
        { name, status, description, imageUrl, category, location, capacity },
        { new: true, runValidators: true },
      );
      break;
    case "seat":
      updatedItem = await Seat.findByIdAndUpdate(
        itemId,
        { name, status, user, description, imageUrl },
        { new: true, runValidators: true },
      );
      break;
    case "equipment":
      updatedItem = await Equipment.findByIdAndUpdate(
        itemId,
        { name, status, description, imageUrl, category },
        { new: true, runValidators: true },
      );
      break;
    default:
      res.status(400).json({ message: "유효하지 않은 타입의 아이템입니다." });
      return;
  }

  res.status(200).json({ message: `${target.itemType} 아이템 정보가 업데이트되었습니다.`, updatedItem });
};

/**
 * @swagger
 * /items/{itemId}:
 *   delete:
 *     tags: [Items]
 *     summary: 아이템 삭제
 *     description: 특정 아이템을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 아이템이 성공적으로 삭제되었습니다.
 *       400:
 *         description: 유효하지 않은 아이템 ID입니다.
 *       404:
 *         description: 해당 아이템을 찾을 수 없습니다.
 */
export const deleteItem = async (
  req: Request<{ itemId: string }, IRoom | ISeat | IEquipment>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;

  if (!isObjectIdValid(itemId)) {
    res.status(400).json({ message: "유효하지 않은 아이템 ID입니다." });
    return;
  }

  const deletedItem = await Item.findByIdAndDelete(itemId);
  if (!deletedItem) {
    res.status(404).json({ message: "해당 아이템을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: `${deletedItem.itemType} 아이템이 삭제되었습니다.` });
};
