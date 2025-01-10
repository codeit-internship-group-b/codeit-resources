"use client";

import { type TBaseItem, type IReservation } from "@repo/types";
import ScheduleTableMobile from "./ScheduleTableMobile";
import ScheduleTableDesktop from "./ScheduleTableDesktop";

interface ScheduleTableProps {
  rooms: TBaseItem[];
  meetingsData: IReservation[];
  selectedDate: string;
}

export default function ScheduleTable(props: ScheduleTableProps): JSX.Element {
  const { rooms, meetingsData, selectedDate } = props;

  return (
    <div className="overflow-hidden">
      <ScheduleTableMobile rooms={rooms} meetingsData={meetingsData} selectedDate={selectedDate} />
      <ScheduleTableDesktop rooms={rooms} meetingsData={meetingsData} selectedDate={selectedDate} />
    </div>
  );
}
