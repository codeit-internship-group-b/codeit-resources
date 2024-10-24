"use client";
import { useMemo } from "react";

interface SeatStatus {
  status: "in-use" | "unavailable" | "reserved" | "available";
  user: string | null;
}

interface ISeat {
  name: string;
  status: string;
  userName?: string;
}

interface UseSeatStatusReturn {
  getSeatStatus: (_seatNum: string) => SeatStatus;
}

export default function useSeatStatus(data: ISeat[]): UseSeatStatusReturn {
  const seatMap = useMemo(() => {
    const map = new Map<string, SeatStatus>();

    data.forEach((seat) => {
      if (seat.status === "in-use") {
        map.set(seat.name, { status: "in-use", user: seat.userName ?? null });
      } else if (seat.status === "unavailable") {
        map.set(seat.name, { status: "unavailable", user: null });
      } else if (seat.status === "reserved") {
        map.set(seat.name, { status: "reserved", user: null });
      }
    });

    return map;
  }, [data]);

  const getSeatStatus = (seatNum: string): SeatStatus => {
    return seatMap.get(seatNum) ?? { status: "available", user: null };
  };

  return { getSeatStatus };
}
