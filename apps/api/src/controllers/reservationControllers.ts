import { type Request, type Response } from "express";
import { type IReservation } from "@repo/types";
import { Item } from "../models";
import { Reservation } from "../models/Reservation";

// 예약 전체 조회
export const getAllReservations = async (req: Request, res: Response): Promise<void> => {
  const reservations: IReservation[] = await Reservation.find();
  res.status(200).json(reservations);
};

// 특정 유저의 예약 조회
export const getUserReservations = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const userReservations: IReservation[] = await Reservation.find({ userId });
  if (!userReservations.length) {
    res.status(404).json({ message: "해당 유저의 예약이 없습니다." });
    return;
  }
  res.status(200).json(userReservations);
};

// 아이템 타입 및 날짜에 대한 예약 조회
export const getReservationsByTypeAndDate = async (req: Request, res: Response): Promise<void> => {
  const { itemType } = req.params;
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    res.status(400).json({ message: "날짜 형식이 잘못되었습니다." });
    return;
  }

  const items = await Item.find({ type: itemType }, "_id");
  if (!items.length) {
    res.status(404).json({ message: "해당 타입의 아이템이 없습니다." });
    return;
  }
  const itemIds = items.map((item) => item._id);

  const targetDate = new Date(`${date}T00:00:00Z`);
  const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));

  const reservations: IReservation[] = await Reservation.find({
    itemId: { $in: itemIds },
    $or: [{ startDate: { $gte: startOfDay, $lte: endOfDay } }, { endDate: { $gte: startOfDay, $lte: endOfDay } }],
  });

  res.status(200).json(reservations);
};

// 특정 아이템에 대한 예약 생성
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const { itemId } = req.params;
  const newReservation = new Reservation<IReservation>({
    ...(req.body as IReservation),
    itemId: String(itemId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const savedReservation: IReservation = await newReservation.save();
  res.status(201).json({ message: "예약에 성공했습니다.", savedReservation });
};

// 특정 예약 수정
export const updateReservation = async (req: Request, res: Response): Promise<void> => {
  const { reservationId } = req.params;
  const updatedReservation = await Reservation.findByIdAndUpdate(
    reservationId,
    { ...(req.body as IReservation), updatedAt: new Date() },
    { new: true },
  );
  if (!updatedReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }
  res.status(200).json(updatedReservation);
};

// 특정 예약 삭제
export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  const { reservationId } = req.params;
  const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
  if (!deletedReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }
  res.status(200).send("예약이 삭제되었습니다.");
};
