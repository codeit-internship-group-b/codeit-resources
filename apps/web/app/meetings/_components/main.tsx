"use client";

import React from "react";
import { rooms } from "../../mocks/mockData";
import ScheduleTable from "./ScheduleTable";
import { useDateStore } from "@/app/store/useDateStore";

export default function MeetingRoomSchedule() {
  const { selectedDate } = useDateStore();

  const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return (
    <div className="mx-16 my-24">
      <ScheduleTable rooms={rooms} selectedDate={formattedDate} />
    </div>
  );
}
