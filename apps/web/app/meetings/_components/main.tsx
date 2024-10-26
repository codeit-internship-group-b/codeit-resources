"use client";

import React from "react";
import { rooms } from "../../mocks/mockData"; // 업데이트된 rooms 데이터를 가져옵니다.
import ScheduleTable from "./ScheduleTable";
import { useDateStore } from "@/app/store/useDateStore"; // 선택된 날짜 가져오기 위한 store import

export default function MeetingRoomSchedule() {
  const { selectedDate } = useDateStore(); // 선택된 날짜 가져오기

  // selectedDate를 "YYYY-MM-DD" 형식의 문자열로 변환
  const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-2xl font-bold">예약 스케줄</h1>
      <ScheduleTable rooms={rooms} selectedDate={formattedDate} />
    </div>
  );
}
