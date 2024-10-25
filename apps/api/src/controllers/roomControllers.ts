import { type Request, type Response } from "express";
import { type IRoom } from "@repo/types/itemType";
import { type TItemStatus } from "@repo/types";
import { Reservation, Room } from "../models";

// 모든 회의실 목록 조회
export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};

// 회의실 아이템 추가
interface CreateRoomRequestBody {
  name: string;
  description?: string;
  status: TItemStatus;
  imageUrl?: string;
  category: string;
  capacity?: number;
  location?: string;
}
export const createRoom = async (req: Request<unknown, IRoom, CreateRoomRequestBody>, res: Response): Promise<void> => {
  const { name, description, status, imageUrl, category, capacity, location } = req.body;

  if (!name || !category) {
    res.status(400).json({ message: "필수 필드가 누락되었습니다." });
    return;
  }

  // 데이터 유효성 검증
  const existingRoom = (await Room.findOne({ name }).select("_id")) as unknown;
  if (existingRoom) {
    res.status(400).json({ message: "이미 존재하는 회의실 이름입니다." });
    return;
  }

  const newRoom = {
    name,
    description: description ?? "",
    status,
    imageUrl: imageUrl ?? "",
    category,
    capacity: capacity ?? 4,
    location: location ?? "",
  };

  const createdRoom = (await Room.create(newRoom)) as unknown;
  res.status(201).json({ message: "회의실이 생성되었습니다.", createdRoom });
};

// 회의실 아이템 정보 수정
interface UpdateRoomRequestBody {
  name?: string;
  description?: string;
  status?: TItemStatus;
  imageUrl?: string;
  category?: string;
  capacity?: number;
  location?: string;
}
export const updateRoom = async (
  req: Request<{ itemId: string }, IRoom, Partial<UpdateRoomRequestBody>>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;
  const { name } = req.body;

  // 데이터 유효성 검증
  if (!/^[0-9a-fA-F]{24}$/.test(itemId)) {
    res.status(400).json({ message: "유효하지 않은 ID입니다." });
    return;
  }

  if (name !== undefined) {
    const existingRoom = (await Room.findOne({ name, _id: { $ne: itemId } }).select("_id")) as unknown;
    if (existingRoom) {
      res.status(400).json({ message: "이미 존재하는 회의실 이름입니다." });
      return;
    }
  }

  const updatedRoom = (await Room.findByIdAndUpdate(itemId, req.body, { new: true, runValidators: true })) as unknown;

  if (!updatedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "회의실 정보가 업데이트되었습니다.", updatedRoom });
};

// 회의실 아이템 삭제 (DELETE /rooms/:itemId)
export const deleteRoom = async (req: Request<{ itemId: string }>, res: Response): Promise<void> => {
  const { itemId } = req.params;

  // 데이터 유효성 검증
  if (!/^[0-9a-fA-F]{24}$/.test(itemId)) {
    res.status(400).json({ message: "유효하지 않은 ID입니다." });
    return;
  }

  const checkAssignedReservations = await Reservation.exists({
    itemId,
    status: "reserved",
  });

  if (checkAssignedReservations) {
    res.status(400).json({ message: "해당 회의실에 예약이 존재합니다. 할당된 예약을 취소 후 다시 시도해주세요" });
    return;
  }

  const deletedRoom = (await Room.findByIdAndDelete(itemId)) as unknown;

  if (!deletedRoom) {
    res.status(404).json({ message: "해당 회의실을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "회의실이 삭제되었습니다." });
};
