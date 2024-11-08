"use client";

import { SEAT_GRID } from "@ui/src/utils/constants/seats";
import useSeatStatus from "@ui/src/hooks/useSeatStatus";
import { useQuery } from "@tanstack/react-query";
import { type IReservation, type ISeat } from "@repo/types";
import { formatSelectedDate } from "@ui/src/utils/date";
import { getAllSeats, getReservedSeats } from "@/api/seats";
import { useDateStore } from "@/app/store/useDateStore";
import { SeatProvider } from "../context/SeatContext";
import SeatBlock from "./SeatBlock";

export default function SeatGrid(): JSX.Element {
  const { selectedDate } = useDateStore();

  const { data: seatsData, isLoading } = useQuery<ISeat[]>({
    queryKey: ["seats"],
    queryFn: () => getAllSeats(),
  });

  const { data: reservedSeatsData, isLoading: reservedSeatsIsLoading } = useQuery<IReservation[]>({
    queryKey: ["seats", "reserved", formatSelectedDate(selectedDate)],
    queryFn: () => getReservedSeats(formatSelectedDate(selectedDate)),
  });

  const { getSeatStatus } = useSeatStatus(seatsData, reservedSeatsData);
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
            isLoading={isLoading || reservedSeatsIsLoading}
          />
        ))}
      </div>
    </SeatProvider>
  );
}
