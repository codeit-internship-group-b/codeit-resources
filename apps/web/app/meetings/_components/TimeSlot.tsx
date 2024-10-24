/* eslint-disable */
"use client";

import React from "react";

interface Schedule {
  id: string;
  date: string;
  start_time: string; // HH:mm 형식
  end_time: string; // HH:mm 형식
  title: string;
  userId: string;
}

interface TimeSlotProps {
  time: string;
  schedules: Schedule[];
  currentUserId: string;
  onSelectSchedule: (schedule: Schedule) => void;
  onCreateReservation: (time: string) => void;
  slotIndex: number;
  selectedStartTime?: string | null;
  selectedEndTime?: string | null;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  schedules,
  currentUserId,
  onSelectSchedule,
  onCreateReservation,
  slotIndex,
  selectedStartTime,
  selectedEndTime,
}) => {
  const slotSchedules = schedules.filter((schedule) => schedule.start_time <= time && schedule.end_time > time);
  const isReserved = slotSchedules.length > 0;

  let backgroundColor = "";
  let scheduleTitle = "";
  let isCurrentUser = false;
  let currentUserSchedule: Schedule | undefined;

  if (isReserved) {
    currentUserSchedule = slotSchedules.find((schedule) => schedule.userId === currentUserId);

    if (currentUserSchedule) {
      backgroundColor = "bg-purple-700/90 hover:bg-purple-400";
      isCurrentUser = true;
    } else {
      backgroundColor = "bg-gray-70 hover:bg-gray-80";
      scheduleTitle = slotSchedules[0]?.title || "";
    }
  }

  // 시간 문자열을 분 단위로 변환하는 함수
  const timeStringToMinutes = (time: string): number => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr as string, 10);
    const minute = parseInt(minuteStr as string, 10);
    return hour * 60 + minute;
  };

  // 선택된 시간 범위 내에 있는지 확인
  let isInSelectedRange = false;

  if (selectedStartTime && selectedEndTime) {
    const timeInMinutes = timeStringToMinutes(time);
    const startMinutes = timeStringToMinutes(selectedStartTime);
    const endMinutes = timeStringToMinutes(selectedEndTime);

    isInSelectedRange = timeInMinutes >= startMinutes && timeInMinutes < endMinutes;
  }

  // 선택된 시간 범위에 있을 때 스타일 적용
  const selectedBackground = isInSelectedRange ? "bg-blue-200" : "";

  return (
    <div
      className={`h-56 ${slotIndex % 2 === 0 ? "" : "border-r-1"} border-gray-400 ${
        isCurrentUser ? "hover:outline-purple-40 hover:bg-purple-200" : "hover:bg-gray-60"
      } hover:outline-1 ${selectedBackground}`}
      onClick={() => {
        if (!isReserved) {
          onCreateReservation(time);
        }
      }}
    >
      <div
        className={`group relative mt-20 h-12 w-[50px] ${backgroundColor}`}
        onClick={(e) => {
          e.stopPropagation();
          if (isCurrentUser && currentUserSchedule) {
            onSelectSchedule(currentUserSchedule);
          }
        }}
      >
        {/* 예약된 슬롯이고 현재 사용자의 예약이 아닐 때 hover 시 제목 표시 */}
        {!isCurrentUser && isReserved && (
          <div className="transition-linear bg-gray-90 text-sm-medium absolute -bottom-14 left-1/2 hidden w-max -translate-x-1/2 -translate-y-full transform gap-16 whitespace-nowrap rounded px-8 py-4 text-white/90 group-hover:block">
            {scheduleTitle}
          </div>
        )}
      </div>
      <div className="border-b-1 border-gray-10 mt-12 border-dotted" />
      {slotIndex % 2 !== 0 && <div className="border-l-1 border-gray-10 -mt-9 h-20" />}
    </div>
  );
};
