"use client";

import { SEAT_GRID } from "@ui/src/utils/constants/seats";
import useSeatStatus from "@ui/src/hooks/useSeatStatus";
import { useQuery } from "@tanstack/react-query";
import { type ISeat } from "@repo/types";
import { getAllSeats } from "@/api/seats";
import { SeatProvider } from "../context/SeatContext";
import SeatBlock from "./SeatBlock";

export default function SeatGrid(): JSX.Element {
  // 탠스택쿼리로 바꿀 예정 (data / Loading)

  // const [data, setData] = useState(seatsMock);
  const { data: seatsData, isLoading } = useQuery<ISeat[]>({
    queryKey: ["dashboard"],
    queryFn: () => getAllSeats(),
  });

  const { getSeatStatus } = useSeatStatus(seatsData);

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
