"use client";

import { useState } from "react";
import { SEAT_GRID } from "@ui/src/utils/constants/seats";
import useSeatStatus from "@ui/src/hooks/useSeatStatus";
import { SeatProvider } from "../context/SeatContext";
import { seatsMock } from "../mock/ItemMock";
import SeatBlock from "./SeatBlock";

export default function SeatGrid(): JSX.Element {
  // 탠스택쿼리로 바꿀 예정 (data / Loading)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(seatsMock);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const { getSeatStatus } = useSeatStatus(data);

  return (
    <SeatProvider>
      <div className="w-660 md:w-1004 m-auto grid grid-cols-2 gap-20 md:gap-40">
        {Object.entries(SEAT_GRID).map(([row, seats]) => (
          <SeatBlock
            key={row}
            seats={seats.map((seatNum) => ({
              seatNum,
              ...getSeatStatus(seatNum),
            }))}
            isLoading={isLoading}
          />
        ))}
      </div>
    </SeatProvider>
  );
}
