"use client";
import { useMemo } from "react";
import { type ISeat } from "@repo/types/src/itemType";

interface SeatStatus {
  status: "in-use" | "unavailable" | "reserved" | "available";
  user: string | null;
}

interface UseSeatStatusReturn {
  getSeatStatus: (_seatNum: string) => SeatStatus;
}

export default function useSeatStatus(data: ISeat[] | undefined): UseSeatStatusReturn {
  const seatMap = useMemo(() => {
    const map = new Map<string, SeatStatus>();

    if (Array.isArray(data)) {
      data.forEach((seat) => {
        if (seat.status === "in-use") {
          map.set(seat.name, { status: "in-use", user: seat.user?.name ?? null });
        } else if (seat.status === "unavailable") {
          map.set(seat.name, { status: "unavailable", user: null });
        }
      });
    }

    return map;
  }, [data]);

  const getSeatStatus = (seatNum: string): SeatStatus => {
    return seatMap.get(seatNum) ?? { status: "available", user: null };
  };

  return { getSeatStatus };
}
