"use client";

import React from "react";
import { rooms } from "../../mocks/mockData"; // 기존 rooms 데이터를 가져옵니다.
import { RoomSchedule } from "./Schedule";
import { useDateStore } from "@/app/store/useDateStore"; // 선택된 날짜 가져오기 위한 store import

export default function MeetingRoomSchedule() {
  const { selectedDate } = useDateStore(); // 선택된 날짜 가져오기
  const selectedDateString = `${selectedDate.year}-${selectedDate.month < 10 ? `0${selectedDate.month}` : selectedDate.month}-${selectedDate.day < 10 ? `0${selectedDate.day}` : selectedDate.day}`;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">회의실 예약 현황</h1>

      {/* 미팅룸 리스트와 각각의 시간표 */}
      {rooms.map((room) => (
        <RoomSchedule
          key={room.id}
          roomName={room.title} // 데이터에서 name을 title로 변경
          schedules={room.schedules
            .filter((schedule) => schedule.date === selectedDateString) // 선택된 날짜에 맞는 스케줄만 필터링
            .map((schedule) => ({
              start: schedule.start_time,
              end: schedule.end_time,
              title: schedule.title,
              userId: schedule.userId,
            }))}
          currentUserId="1"
        />
      ))}
    </div>
  );
}
