import { clsx } from "clsx";
import SeatButton from "./SeatButton";

interface Seat {
  seatNum: string;
  status: "available" | "fixed" | "unavailable" | "unknown";
  user?: string | null;
}

export default function SeatBlock({ seats }: { seats: Seat[] }): JSX.Element {
  const gridRowsClass = seats.length <= 5 ? "grid-rows-1" : "grid-rows-2";

  return (
    <div className={clsx(`grid auto-cols-min auto-rows-min grid-cols-5 gap-6 md:gap-8 ${gridRowsClass}`)}>
      {seats.map(({ seatNum, status, user }) => (
        <SeatButton key={seatNum} status={status} user={user} />
      ))}
    </div>
  );
}
