"use client";

import { useMemo } from "react";
import { type ISeat, type IReservation } from "@repo/types";

interface SeatStatus {
  status: "in-use" | "unavailable" | "reserved" | "available";
  user: string | null;
  itemId: string;
}

interface UseSeatStatusReturn {
  getSeatStatus: (_seatNum: string) => SeatStatus;
}

export default function useSeatStatus(
  data: ISeat[] | undefined,
  reservedData: IReservation[] | undefined,
): UseSeatStatusReturn {
  const seatMap = useMemo(() => {
    const map = new Map<string, SeatStatus>();

    if (Array.isArray(data)) {
      data.forEach((seat) => {
        if (seat.status === "in-use") {
          map.set(seat.name, { status: "in-use", itemId: seat._id, user: seat.user?.name ?? null });
        } else if (seat.status === "unavailable") {
          map.set(seat.name, { status: "unavailable", itemId: seat._id, user: null });
        } else {
          map.set(seat.name, { status: "available", itemId: seat._id, user: null });
        }
      });
    }

    if (Array.isArray(reservedData)) {
      reservedData.forEach((reservation) => {
        if (reservation.itemType === "seat") {
          const seatItem = reservation.item as ISeat;
          map.set(seatItem.name, {
            status: "reserved",
            itemId: seatItem._id,
            user: reservation.user.name,
          });
        }
      });
    }

    return map;
  }, [data, reservedData]);

  const getSeatStatus = (seatNum: string): SeatStatus => {
    return seatMap.get(seatNum) ?? { status: "available", itemId: "", user: null };
  };

  return { getSeatStatus };
}
