"use client";

import { useMemo, useState } from "react";
import { SEAT_GRID } from "@ui/src/utils/constants/seatGrid";
import SeatBlock from "./SeatBlock";

const mock = {
  fixedSeats: [
    {
      seat: "A1",
      user: "김현학",
    },
    {
      seat: "A2",
      user: "황준우",
    },
    {
      seat: "A3",
      user: "이준기",
    },
    {
      seat: "A4",
      user: "김윤미",
    },
    {
      seat: "B1",
      user: "박건우",
    },
    {
      seat: "B2",
      user: "박태건",
    },
    {
      seat: "B3",
      user: "안가영",
    },
    {
      seat: "B4",
      user: "김시온",
    },
    {
      seat: "B5",
      user: "정유진",
    },
    {
      seat: "C1",
      user: "정승호",
    },
    {
      seat: "C2",
      user: "최익중",
    },
    {
      seat: "C3",
      user: "박소정",
    },
    {
      seat: "C4",
      user: "노유정",
    },
    {
      seat: "C5",
      user: "문동우",
    },
    {
      seat: "D1",
      user: "이다현",
    },
    {
      seat: "D2",
      user: "홍성륜",
    },
    {
      seat: "D3",
      user: "이채빈",
    },
    {
      seat: "D4",
      user: "김민영",
    },
    {
      seat: "D5",
      user: "김나연",
    },
    {
      seat: "D6",
      user: "서혜선",
    },
    {
      seat: "D7",
      user: "이시형",
    },
    {
      seat: "D8",
      user: "박혜지",
    },
    {
      seat: "D9",
      user: "조수진",
    },
    {
      seat: "D10",
      user: "조호성",
    },
    {
      seat: "H4",
      user: "Ayden",
    },
    {
      seat: "H5",
      user: "이유정",
    },
  ],
  unavailableSeats: ["H6", "H7", "H8", "H9", "H10", "J1", "J2", "J3", "J4", "J5"],
};

interface SeatStatus {
  status: "fixed" | "unavailable" | "available" | "unknown";
  user: string | null;
}

export default function SeatGrid(): JSX.Element {
  const [data, setData] = useState(mock);

  const seatMap = useMemo(() => {
    const map = new Map<string, SeatStatus>();

    data.fixedSeats.forEach((seat) => {
      map.set(seat.seat, { status: "fixed", user: seat.user });
    });

    data.unavailableSeats.forEach((seat) => {
      map.set(seat, { status: "unavailable", user: null });
    });

    return map;
  }, [data]);

  function getSeatStatus(seatNum: string): SeatStatus {
    return seatMap.get(seatNum) ?? { status: "available", user: null };
  }

  return (
    <div className="w-660 md:w-1004 m-auto grid grid-cols-2 gap-20 md:gap-40">
      {Object.entries(SEAT_GRID).map(([row, seats]) => (
        <SeatBlock
          key={row}
          seats={seats.map((seatNum) => ({
            seatNum,
            ...getSeatStatus(seatNum),
          }))}
        />
      ))}
    </div>
  );
}
