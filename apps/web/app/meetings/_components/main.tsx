"use client";

import { useDateStore } from "@/app/store/useDateStore";
import { rooms } from "../../mocks/mockData";
import ScheduleTable from "./Schedule/ScheduleTable";

export default function MeetingRoomSchedule(): JSX.Element {
  const { selectedDate } = useDateStore();

  const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return <ScheduleTable rooms={rooms} selectedDate={formattedDate} />;
}
