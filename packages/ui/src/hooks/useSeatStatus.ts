"use client";

import { useMemo } from "react";
import { type ISeat, type IReservation, type IRoom, type IEquipment } from "@repo/types";

interface SeatStatus {
  status: "in-use" | "unavailable" | "reserved" | "available";
  user: string | null;
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
          map.set(seat.name, { status: "in-use", user: seat.user?.name ?? null });
        } else if (seat.status === "unavailable") {
          map.set(seat.name, { status: "unavailable", user: null });
        } else {
          map.set(seat.name, { status: "available", user: null });
        }
      });
    }

    function isISeat(item: ISeat | IRoom | IEquipment | string): item is ISeat {
      return (item as ISeat).user !== undefined;
    }

    if (Array.isArray(reservedData)) {
      reservedData.forEach((reservation) => {
        if (reservation.itemType === "seat" && isISeat(reservation.item)) {
          map.set(reservation.item.name, { status: "reserved", user: reservation.user.name });
        }
      });
    }

    return map;
  }, [data, reservedData]);

  const getSeatStatus = (seatNum: string): SeatStatus => {
    return seatMap.get(seatNum) ?? { status: "available", user: null };
  };

  return { getSeatStatus };
}
