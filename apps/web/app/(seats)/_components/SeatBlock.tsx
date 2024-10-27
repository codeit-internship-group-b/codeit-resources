"use client";
import { clsx } from "clsx";
import SeatButton from "./SeatButton";

interface Seat {
  seatNum: string;
  status: "in-use" | "unavailable" | "available" | "reserved";
  user: string | null;
}

interface SeatBlockProps {
  seats: Seat[];
  isLoading: boolean;
}

export default function SeatBlock({ seats, isLoading }: SeatBlockProps): JSX.Element {
  const gridRowsClass = seats.length <= 5 ? "grid-rows-1" : "grid-rows-2";

  return (
    <div className={clsx("grid auto-cols-min auto-rows-min grid-cols-5 gap-6 md:gap-8", gridRowsClass)}>
      {seats.map((seat) => (
        <SeatButton key={seat.seatNum} {...seat} isLoading={isLoading} />
      ))}
    </div>
  );
}
