import { type Request, type Response } from "express";
import { type IReservation } from "@repo/types/src/reservationType";
import { type FilterQuery } from "mongoose";
import { type IItem } from "@repo/types";
import { Reservation } from "../models/reservationModel";
import { isValidDateFormat } from "../utils/isValidDateFormat";
import { isTimeInTenMinuteIntervals } from "../utils/isMinuteValid";
import { getStartAndEndOfDay } from "../utils/getStartAndEndOfDay";
import { Item } from "../models/itemModel";

// 특정 유저의 오늘 날짜 예약 조회(dashboards)
export const getUserReservations = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  const { userId } = req.params;
  const today = new Date();
  const { startOfDay, endOfDay } = getStartAndEndOfDay(today);

  const userReservations: IReservation[] = await Reservation.find({
    userId,
    startAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ startAt: 1 });
  if (userReservations.length === 0) {
    res.status(200).json({ message: "해당 유저의 예약이 없습니다.", reservations: [] });
    return;
  }

  const itemIds = userReservations.map((reservation) => reservation.itemId);
  const items: IItem[] = await Item.find({ _id: { $in: itemIds } });

  const reservationsByType = {
    seat: [] as IReservation[],
    room: [] as IReservation[],
    equipment: [] as IReservation[],
  };

  userReservations.forEach((reservation) => {
    const item = items.find((i) => i._id === reservation.itemId);
    if (item) {
      reservationsByType[item.type].push(reservation);
    }
  });

  res.status(200).json(reservationsByType);
};

// 아이템 타입 및 날짜에 대한 예약 조회
export const getReservationsByTypeAndDate = async (
  req: Request<{ itemType: string }, unknown, IReservation, { date?: string; status?: string }>,
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

  if (!isTimeInTenMinuteIntervals(startAt) || !isTimeInTenMinuteIntervals(endAt)) {
    res.status(400).json({ message: "시간은 10분 단위로 설정해야 합니다." });
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
    // todo 시간 기본값 추가
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

  if (startAt && !isTimeInTenMinuteIntervals(startAt)) {
    res.status(400).json({ message: "startAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }
  if (endAt && !isTimeInTenMinuteIntervals(endAt)) {
    res.status(400).json({ message: "endAt 시간은 10분 단위로 설정해야 합니다." });
    return;
  }

  const targetReservation: IReservation | null = await Reservation.findById(reservationId);
  if (!targetReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }

  // 중복 예약 검사
  const overlappingReservation = await Reservation.findOne({
    itemId: targetReservation.itemId,
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

  const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(reservationId, req.body, {
    new: true,
  });

  res.status(200).json(updatedReservation);
};

// 특정 예약 삭제
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
