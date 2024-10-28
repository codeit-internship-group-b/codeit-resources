import { type Request, type Response } from "express";
import { type IReservation } from "@repo/types/src/reservationType";
import { type FilterQuery } from "mongoose";
import { type TReservationStatus } from "@repo/types";
import { Item } from "../models/itemModel";
import { Reservation } from "../models/reservationModel";
import { User } from "../models";
import { isMinuteValid } from "../utils/isMinuteValid";
import { isValidDateFormat } from "../utils/isValidDateFormat";
import { getStartAndEndOfDay } from "../utils/getStartAndEndOfDay";
import { isOverlappedReservation } from "../utils/isOverlappedReservation";

interface ReservationRequestBody {
  userId: string;
  itemId: string;
  startAt: Date;
  endAt: Date;
  status?: TReservationStatus;
  notes?: string;
  attendees?: string[];
}

// 특정 유저의 오늘 날짜 예약 전체 조회(dashboards)
export const getUserReservations = async (
  req: Request<{ userId: string }, IReservation[]>,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const today = new Date();
  const { startOfDay, endOfDay } = getStartAndEndOfDay(today);

  const userReservations: IReservation[] = await Reservation.find({
    userId,
    startAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ itemType: 1, startAt: 1 });

  if (userReservations.length === 0) {
    res.status(200).json({ message: "해당 유저의 예약이 없습니다.", reservations: [] });
    return;
  }

  res.status(200).json(userReservations);
};

// 아이템 타입 및 날짜에 대한 예약 조회
export const getReservationsByTypeAndDate = async (
  req: Request<{ itemType: string }, IReservation[], undefined, { date?: string; status?: string }>,
  res: Response,
): Promise<void> => {
  const { itemType } = req.params;
  const { date, status } = req.query;

  let searchDate = date;
  if (!searchDate) {
    const today = new Date();
    searchDate = today.toISOString().split("T")[0];
  } else if (!isValidDateFormat(searchDate)) {
    res.status(400).json({ message: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식으로 입력해주세요." });
    return;
  }

  const itemIds = await Item.find({ itemType }, "_id");
  if (itemIds.length === 0) {
    res.status(404).json({ message: "해당 타입의 아이템이 없습니다." });
    return;
  }

  const targetDate = new Date(`${searchDate}T00:00:00Z`);
  const { startOfDay, endOfDay } = getStartAndEndOfDay(targetDate);

  const query: FilterQuery<IReservation> = {
    itemId: { $in: itemIds },
    $or: [{ startAt: { $gte: startOfDay, $lte: endOfDay } }, { endAt: { $gte: startOfDay, $lte: endOfDay } }],
  };

  if (status) {
    query.status = status;
  }

  const reservations: IReservation[] = await Reservation.find(query).sort({ status: 1, startAt: 1 });

  res.status(200).json(reservations);
};

// 특정 아이템에 대한 예약 생성
export const createReservation = async (
  req: Request<{ itemId: string }, IReservation, ReservationRequestBody>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;
  const { userId, startAt, endAt, status, notes, attendees } = req.body;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const userExists = await User.findById(userId).select("_id");
  if (!userExists) {
    res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    return;
  }

  const itemExists = await Item.findById(itemId).select("_id itemType");
  if (!itemExists) {
    res.status(404).json({ message: "존재하지 않는 아이템입니다." });
    return;
  }

  if (!isMinuteValid(startAt) || !isMinuteValid(endAt)) {
    res.status(400).json({ message: "시간은 10분 단위로 설정해야 합니다." });
    return;
  }

  if (startAt >= endAt) {
    res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
    return;
  }

  // 중복 예약 검사
  const overlappingReservation = await isOverlappedReservation(itemId, startAt, endAt);
  if (overlappingReservation) {
    res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    return;
  }

  const newReservation = new Reservation({
    userId,
    itemId,
    itemType: itemExists.itemType,
    startAt,
    endAt,
    status: status ?? "reserved",
    notes: notes ?? "",
    attendees: attendees ?? [],
  });

  const savedReservation: IReservation = await newReservation.save();
  res.status(201).json({ message: "예약에 성공했습니다.", savedReservation });
};

// 특정 예약 수정
export const updateReservation = async (
  req: Request<{ reservationId: string }, IReservation, Partial<ReservationRequestBody>>,
  res: Response,
): Promise<void> => {
  const { reservationId } = req.params;
  const { startAt, endAt } = req.body;

  // 예약 존재여부 확인
  const targetReservation: IReservation | null =
    await Reservation.findById(reservationId).select("startAt endAt itemId");
  if (!targetReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }

  // 기존 startAt, endAt 값을 가져옴
  const existingStartAt = targetReservation.startAt;
  const existingEndAt = targetReservation.endAt;

  // startAt이나 endAt 중 하나만 수정된 경우 기존 값을 유지
  const finalStartAt = startAt ? startAt : existingStartAt;
  const finalEndAt = endAt ? endAt : existingEndAt;

  if (!isMinuteValid(finalStartAt)) {
    res.status(400).json({ message: "startAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }
  if (!isMinuteValid(finalEndAt)) {
    res.status(400).json({ message: "endAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }

  if (finalStartAt >= finalEndAt) {
    res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
    return;
  }

  const overlappingReservation = await isOverlappedReservation(
    targetReservation.itemId,
    finalStartAt,
    finalEndAt,
    targetReservation._id,
  );
  if (overlappingReservation) {
    res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    return;
  }

  const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(
    reservationId,
    {
      startAt: finalStartAt,
      endAt: finalEndAt,
      status: req.body.status,
      notes: req.body.notes,
      attendees: req.body.attendees,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json(updatedReservation);
};

// 특정 예약 삭제(만들긴 했는데, updateReservation으로 cancelled 상태로 전환하는게 맞는듯)
export const deleteReservation = async (
  req: Request<{ reservationId: string }, unknown, unknown>,
  res: Response,
): Promise<void> => {
  const { reservationId } = req.params;
  const deletedReservation: IReservation | null = await Reservation.findByIdAndDelete(reservationId);
  if (!deletedReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }
  res.status(200).json({ message: "예약이 삭제되었습니다." });
};
