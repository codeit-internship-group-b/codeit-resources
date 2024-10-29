import { type Request, type Response } from "express";
import { type IEquipment, type IRoom, type ISeat } from "@repo/types";
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

// 모든 아이템 목록 조회
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
        items = await Seat.find();
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

// 아이템 추가
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

// 아이템 정보 수정
export const updateItem = async (
  req: Request<{ itemId: string }, IRoom | ISeat | IEquipment, Partial<ItemRequestBody>>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;

  if (!isObjectIdValid(itemId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
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

// 아이템 삭제
export const deleteItem = async (
  req: Request<{ itemId: string }, IRoom | ISeat | IEquipment>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;

  if (!isObjectIdValid(itemId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const deletedItem = await Item.findByIdAndDelete(itemId);
  if (!deletedItem) {
    res.status(404).json({ message: "해당 아이템을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: `${deletedItem.itemType} 아이템이 삭제되었습니다.` });
};
