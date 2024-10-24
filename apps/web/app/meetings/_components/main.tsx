"use client";

import React from "react";
import { rooms } from "../../mocks/mockData"; // 기존 rooms 데이터를 가져옵니다.
import { RoomSchedule } from "./Schedule";
import { useDateStore } from "@/app/store/useDateStore"; // 선택된 날짜 가져오기 위한 store import

export default function MeetingRoomSchedule() {
  const { selectedDate } = useDateStore(); // 선택된 날짜 가져오기
  const selectedDateString = `${selectedDate.year}-${selectedDate.month < 10 ? `0${selectedDate.month}` : selectedDate.month}-${selectedDate.day < 10 ? `0${selectedDate.day}` : selectedDate.day}`;

  return (
    <div className="px-16 py-24">
      <p className="text-custom-black/50 text-md-medium">미팅룸</p>

      {/* 미팅룸 리스트와 각각의 시간표 */}
      {rooms.map((room) => (
        <RoomSchedule
          key={room.id}
          roomName={room.title} // 데이터에서 name을 title로 변경
          schedules={room.schedules
            .filter((schedule) => schedule.date === selectedDateString)
            .map((schedule) => ({
              id: schedule.id,
              date: schedule.date, // date 속성 추가
              start_time: schedule.start_time, // start_time으로 변경
              end_time: schedule.end_time, // end_time으로 변경
              title: schedule.title,
              userId: schedule.userId,
            }))}
          currentUserId="1"
        />
      ))}
    </div>
  );
}
