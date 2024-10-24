import { type Request, type Response } from "express";
import { type IRoom } from "@repo/types/itemType";
import { type TItemStatus } from "@repo/types";
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
  status: TItemStatus;
  imageUrl?: string;
  category: string;
  capacity?: number;
  location?: string;
}
export const createRoom = async (req: Request<unknown, IRoom, CreateRoomRequestBody>, res: Response): Promise<void> => {
  const { name, description, status, imageUrl, category, capacity, location } = req.body;
  const newRoom = {
    name,
    description: description ? description : "",
    status,
    imageUrl: imageUrl ? imageUrl : "",
    category,
    capacity: capacity ? capacity : 4,
    location: location ? location : "",
    type: "room",
  };

  const createdRoom = (await Room.create(newRoom)) as unknown;
  res.status(201).json(createdRoom);
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
  req: Request<{ id: string }, IRoom, Partial<UpdateRoomRequestBody>>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const updatedRoom = (await Room.findByIdAndUpdate(id, req.body, { new: true })) as unknown;

  if (!updatedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json(updatedRoom);
};

// 회의실 아이템 삭제 (DELETE /rooms/:id)
export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedRoom = (await Room.findByIdAndDelete(id)) as unknown;

  if (!deletedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "회의실이 삭제되었습니다." });
};
