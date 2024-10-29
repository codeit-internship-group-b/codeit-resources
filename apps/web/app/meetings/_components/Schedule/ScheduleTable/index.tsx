"use client";

import { type ScheduleDate } from "@/app/types/scheduletypes";
import ScheduleTableMobile from "./ScheduleTableMobile";
import ScheduleTableDesktop from "./ScheduleTableDesktop";

type ScheduleTableProps = ScheduleDate;

export default function ScheduleTable(props: ScheduleTableProps): JSX.Element {
  const { rooms, selectedDate } = props;

  return (
    <div className="overflow-hidden">
      <ScheduleTableMobile rooms={rooms} selectedDate={selectedDate} />
      <ScheduleTableDesktop rooms={rooms} selectedDate={selectedDate} />
    </div>
  );
}
