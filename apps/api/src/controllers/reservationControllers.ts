import { type Request, type Response } from "express";
import { type TReservationStatus, type IReservation } from "@repo/types/src/reservationType";
import { Item } from "../models";
import { Reservation } from "../models/reservationModel";
import isValidDateFormat from "../utils/isValidDateFormat";

// 특정 유저의 오늘 날짜 예약 조회(dashboards)
export const getUserReservations = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  const { userId } = req.params;
  const today = new Date();
  const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));

  const userReservations: IReservation[] = await Reservation.find({
    userId,
    startAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ startAt: 1 });
  if (userReservations.length === 0) {
    res.status(200).json({ message: "해당 유저의 예약이 없습니다.", reservations: [] });
    return;
  }

  const itemIds = userReservations.map((reservation) => reservation.itemId);
  const items = await Item.find({ _id: { $in: itemIds } });

  const reservationsByType = {
    seat: [] as IReservation[],
    room: [] as IReservation[],
    equipment: [] as IReservation[],
  };

  userReservations.forEach((reservation) => {
    const item = items.find((i) => i._id.toString() === reservation.itemId);
    if (item) {
      reservationsByType[item.type].push(reservation);
    }
  });

  res.status(200).json(reservationsByType);
};

// 아이템 타입 및 날짜에 대한 예약 조회
export const getReservationsByTypeAndDate = async (
  req: Request<{ itemType: string }, unknown, IReservation, { date?: string }>,
  res: Response,
): Promise<void> => {
  const { itemType } = req.params;
  let { date } = req.query;

  // 날짜가 없을 경우 오늘 날짜로 기본값 설정
  if (!date) {
    const today = new Date();
    date = today.toISOString().split("T")[0];
  }

  const items = await Item.find({ type: itemType }, "_id");
  if (items.length === 0) {
    res.status(404).json({ message: "해당 타입의 아이템이 없습니다." });
    return;
  }
  const itemIds = items.map((item) => item._id);

  if (typeof date !== "string" || !isValidDateFormat(date)) {
    res.status(400).json({ message: "날짜 형식이 잘못되었습니다." });
    return;
  }

  const targetDate = new Date(`${date}T00:00:00Z`);
  const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));

  const reservations: IReservation[] = await Reservation.find({
    itemId: { $in: itemIds },
    $or: [{ startDate: { $gte: startOfDay, $lte: endOfDay } }, { endDate: { $gte: startOfDay, $lte: endOfDay } }],
  }).sort({ startAt: 1 });

  res.status(200).json(reservations);
};

// 특정 아이템에 대한 예약 생성
interface CreateReservationRequestBody {
  userId: string; // 예약한 사용자 ID (User의 id)
  itemId: string; // 예약된 리소스 ID (Item의 id)
  startAt: Date;
  endAt: Date;
  status: TReservationStatus;
  notes?: string;
  attendees?: string[];
}
export const createReservation = async (
  req: Request<{ itemId: string }, IReservation, CreateReservationRequestBody>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;
  const newReservation = new Reservation({
    userId: ``,
    itemId,
    // todo 시간 기본값 추가
    startAt: "",
    endAt: "",
    status: "reserved",
    notes: "",
    attendees: [],
  });

  const savedReservation: IReservation = await newReservation.save();
  res.status(201).json({ message: "예약에 성공했습니다.", savedReservation });
};

// 특정 예약 수정
interface UpdateReservationRequestBody {
  startAt?: Date;
  endAt?: Date;
  status?: TReservationStatus;
  notes?: string;
  attendees?: string[];
}
export const updateReservation = async (
  req: Request<{ reservationId: string }, IReservation, UpdateReservationRequestBody>,
  res: Response,
): Promise<void> => {
  const { reservationId } = req.params;

  const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(reservationId, req.body, {
    new: true,
  });
  if (!updatedReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }
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
