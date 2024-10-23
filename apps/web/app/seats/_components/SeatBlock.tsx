import { clsx } from "clsx";
import SeatButton from "./SeatButton";

export default function SeatBlock({ seats }: { seats: string[] }): JSX.Element {
  const gridRowsClass = seats.length <= 5 ? "grid-rows-1" : "grid-rows-2";

  return (
    <div className={clsx(`grid auto-cols-min auto-rows-min grid-cols-5 gap-6 md:gap-8 ${gridRowsClass}`)}>
      {seats.map((seatNum) => (
        <SeatButton key={seatNum} />
      ))}
    </div>
  );
}
