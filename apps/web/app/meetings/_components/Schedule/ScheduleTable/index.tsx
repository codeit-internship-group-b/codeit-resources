"use client";

import ScheduleTableMobile from "./ScheduleTableMobile";
import ScheduleTableDesktop from "./ScheduleTableDesktop";
import { type ScheduleDate } from "@/app/types/scheduletypes";

type ScheduleTableProps = ScheduleDate;

export default function ScheduleTable(props: ScheduleTableProps): JSX.Element {
  const { rooms, selectedDate } = props;

  return (
    <div className="w-full">
      <ScheduleTableMobile rooms={rooms} selectedDate={selectedDate} />
      <ScheduleTableDesktop rooms={rooms} selectedDate={selectedDate} />
    </div>
  );
}
