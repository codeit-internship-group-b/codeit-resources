"use client";

import ScheduleTableMobile from "./ScheduleTableMobile";
import ScheduleTableDesktop from "./ScheduleTableDesktop";
import { type Room } from "@/app/types/scheduletypes";

interface ScheduleTableProps {
  rooms: Room[];
  selectedDate: string;
}

export default function ScheduleTable(props: ScheduleTableProps): JSX.Element {
  const { rooms, selectedDate } = props;

  return (
    <div className="w-full">
      <ScheduleTableMobile rooms={rooms} selectedDate={selectedDate} />
      <ScheduleTableDesktop rooms={rooms} selectedDate={selectedDate} />
    </div>
  );
}
