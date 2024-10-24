import { type Request, type Response } from "express";
import { type IReservation } from "@repo/types/src/reservationType";
import { type FilterQuery } from "mongoose";
import { Reservation } from "../models/reservationModel";
import { isValidDateFormat } from "../utils/isValidDateFormat";
import { getStartAndEndOfDay } from "../utils/getStartAndEndOfDay";
import { Item } from "../models/itemModel";
import { isMinuteValid } from "../utils/isMinuteValid";
import { User } from "../models";

// 특정 유저의 오늘 날짜 예약 전체 조회(dashboards)
export const getUserReservations = async (
  req: Request<{ userId: string }, IReservation[], unknown>,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;

  // userId 정규식 검사
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const today = new Date();
  const { startOfDay, endOfDay } = getStartAndEndOfDay(today);

  const userReservations: IReservation[] = await Reservation.find({
    userId,
    startAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ type: 1, startAt: 1 });

  if (userReservations.length === 0) {
    res.status(200).json({ message: "해당 유저의 예약이 없습니다.", reservations: [] });
    return;
  }

  res.status(200).json(userReservations);
};

// 아이템 타입 및 날짜에 대한 예약 조회
export const getReservationsByTypeAndDate = async (
  req: Request<{ itemType: string }, IReservation[], unknown, { date?: string; status?: string }>,
  res: Response,
): Promise<void> => {
  const { itemType } = req.params;
  const { date, status } = req.query;

  let searchDate = date;
  // 날짜가 없을 경우 오늘 날짜로 기본값 설정
  if (!searchDate) {
    const today = new Date();
    searchDate = today.toISOString().split("T")[0];
  }

  const items = await Item.find({ type: itemType }, "_id");
  if (items.length === 0) {
    res.status(404).json({ message: "해당 타입의 아이템이 없습니다." });
    return;
  }
  const itemIds = items.map((item) => item._id);

  if (typeof searchDate !== "string" || !isValidDateFormat(searchDate)) {
    res.status(400).json({ message: "날짜 형식이 잘못되었습니다." });
    return;
  }

  const targetDate = new Date(`${searchDate}T00:00:00Z`);
  const { startOfDay, endOfDay } = getStartAndEndOfDay(targetDate);

  // 동적으로 필터링 조건 설정
  const query: FilterQuery<IReservation> = {
    itemId: { $in: itemIds },
    $or: [{ startAt: { $gte: startOfDay, $lte: endOfDay } }, { endAt: { $gte: startOfDay, $lte: endOfDay } }],
  };

  // status가 있으면 추가
  if (status) {
    query.status = status;
  }

  const reservations: IReservation[] = await Reservation.find(query).sort({ status: 1, startAt: 1 });

  res.status(200).json(reservations);
};

// 특정 아이템에 대한 예약 생성
interface CreateReservationRequestBody {
  userId: string; // 예약한 사용자 ID (User의 id)
  itemId: string; // 예약된 리소스 ID (Item의 id)
  startAt: Date;
  endAt: Date;
  status: string;
  notes?: string;
  attendees?: string[];
}
export const createReservation = async (
  req: Request<{ itemId: string }, IReservation, CreateReservationRequestBody>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;
  const { userId, startAt, endAt, notes, attendees, status } = req.body;

  // userId 정규식 검사
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  // userId 검증
  const userExists = await User.findById(userId).select("_id");
  if (!userExists) {
    res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    return;
  }

  // itemId 검증
  const itemExists = await Item.findById(itemId).select("_id");
  if (!itemExists) {
    res.status(404).json({ message: "존재하지 않는 아이템입니다." });
    return;
  }

  // 시간 10분 단위인지 검사
  if (!isMinuteValid(startAt) || !isMinuteValid(endAt)) {
    res.status(400).json({ message: "시간은 10분 단위로 설정해야 합니다." });
    return;
  }

  // 시작, 종료 시간 검사
  if (startAt >= endAt) {
    res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
    return;
  }

  // 중복 예약 검사
  const overlappingReservation = await Reservation.findOne({
    itemId,
    status: "reserved",
    $or: [
      { startAt: { $lt: endAt }, endAt: { $gt: startAt } }, // 기존 예약의 시간과 겹치는지 확인
    ],
    $nor: [
      { startAt: { $eq: endAt } }, // 새 예약의 시작 시간이 기존 예약의 종료 시간과 동일한 경우
      { endAt: { $eq: startAt } }, // 새 예약의 종료 시간이 기존 예약의 시작 시간과 동일한 경우
    ],
  });

  if (overlappingReservation) {
    res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    return;
  }

  const newReservation = new Reservation({
    userId,
    itemId,
    startAt,
    endAt,
    status: status ? status : "reserved",
    notes,
    attendees: attendees ? attendees : [],
  });

  const savedReservation: IReservation = await newReservation.save();
  res.status(201).json({ message: "예약에 성공했습니다.", savedReservation });
};

// 특정 예약 수정
interface UpdateReservationRequestBody {
  startAt?: Date;
  endAt?: Date;
  status?: string;
  notes?: string;
  attendees?: string[];
}
export const updateReservation = async (
  req: Request<{ reservationId: string }, IReservation, UpdateReservationRequestBody>,
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

  // 시작, 종료 시간이 10분 단위인지 검사
  if (!isMinuteValid(finalStartAt)) {
    res.status(400).json({ message: "startAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }
  if (!isMinuteValid(finalEndAt)) {
    res.status(400).json({ message: "endAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }

  // 시작, 종료 시간 크기 비교
  if (finalStartAt >= finalEndAt) {
    res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
    return;
  }

  // 중복 예약 검사
  const overlappingReservation = await Reservation.findOne({
    itemId: targetReservation.itemId,
    status: "reserved",
    _id: { $ne: reservationId }, // 자신을 제외한 예약을 검사
    $or: [
      { startAt: { $lt: finalEndAt }, endAt: { $gt: finalStartAt } }, // 시간 겹치는지 확인
    ],
    $nor: [
      { startAt: { $eq: finalEndAt } }, // 새 예약의 시작 시간이 기존 예약의 종료 시간과 동일한 경우
      { endAt: { $eq: finalStartAt } }, // 새 예약의 종료 시간이 기존 예약의 시작 시간과 동일한 경우
    ],
  });

  if (overlappingReservation) {
    res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    return;
  }

  // 예약 업데이트
  const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(
    reservationId,
    {
      ...req.body,
      startAt: finalStartAt,
      endAt: finalEndAt,
    }, // 최종 시간 값으로 업데이트
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
