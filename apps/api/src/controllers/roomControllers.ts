import { type Request, type Response } from "express";
import { type IItem } from "@repo/types/itemType";
import { Room } from "../models";

// 모든 회의실 목록 조회
export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};

// 회의실 아이템 추가
interface CreateRoomRequestBody {
  name: string;
  description: string;
  status: string;
  imageUrl: string;
  category: string;
  capacity: number;
  location: string;
  tags: string[];
}
export const createRoom = async (req: Request<unknown, IItem, CreateRoomRequestBody>, res: Response): Promise<void> => {
  const { name, description, status, imageUrl, category, capacity, location, tags } = req.body;
  if (!name || !category) {
    res.status(400).json({ message: "필수 값이 누락되었습니다." });
    return;
  }
  const newRoom = new Room({
    name,
    description: description || "",
    status: status || "available",
    imageUrl: imageUrl || "",
    category,
    capacity: capacity || 4,
    location: location || "",
    tags,
    type: "room", // Room 타입이므로 type은 고정
  });
  const savedRoom = await newRoom.save();
  res.status(201).json(savedRoom);
};

// 회의실 아이템 정보 수정
interface UpdateRoomRequestBody {
  name?: string;
  description?: string;
  status?: string;
  imageUrl?: string;
  category?: string;
  capacity?: number;
  location?: string;
  tags?: string[];
}
export const updateRoom = async (
  req: Request<{ id: string }, IItem, Partial<UpdateRoomRequestBody>>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json(updatedRoom);
};

// 회의실 아이템 삭제 (DELETE /rooms/:id)
export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedRoom = await Room.findByIdAndDelete(id);

  if (!deletedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "회의실이 삭제되었습니다." });
};
