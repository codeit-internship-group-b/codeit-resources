import { type IReservation } from "@repo/types";
import { type FilterQuery } from "mongoose";
import { Reservation } from "../models";

export const isOverlappedReservation = async (
  itemId: string,
  startAt: Date,
  endAt: Date,
  excludeReservationId?: string,
): Promise<boolean> => {
  const query: FilterQuery<IReservation> = {
    item: itemId,
    status: "reserved",
    $or: [
      // 신규 startAt < 기존 endAt && 신규 endAt > 기존 startAt
      { startAt: { $lt: endAt }, endAt: { $gt: startAt } },
    ],
    $nor: [
      // 새 예약의 시작시간 === 기존 예약의 종료시간
      { startAt: { $eq: endAt } },
      // 기존 예약의 시작시간 === 새 예약의 종료시간
      { endAt: { $eq: startAt } },
    ],
  };

  if (excludeReservationId) {
    query._id = { $ne: excludeReservationId };
  }

  return Boolean(await Reservation.exists(query));
};
