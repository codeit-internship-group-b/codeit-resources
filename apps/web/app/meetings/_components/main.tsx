"use client";

import { rooms } from "../../mocks/mockData";
import ScheduleTable from "./Schedule/ScheduleTable";
import { useDateStore } from "@/app/store/useDateStore";

export default function MeetingRoomSchedule(): JSX.Element {
  const { selectedDate } = useDateStore();

  const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return <ScheduleTable rooms={rooms} selectedDate={formattedDate} />;
}
