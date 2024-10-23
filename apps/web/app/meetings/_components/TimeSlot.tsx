/* eslint-disable*/
import React from "react";

interface Schedule {
  start: string;
  end: string;
  title: string;
  userId: string;
}

interface TimeSlotProps {
  time: string;
  schedules: Schedule[];
  currentUserId: string;
  onSelectSchedule: (schedule: Schedule) => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ time, schedules, currentUserId, onSelectSchedule }) => {
  // 이 시간 슬롯에 예약이 있는지 확인
  const slotSchedules = schedules.filter((schedule) => schedule.start <= time && schedule.end > time);
  const isReserved = slotSchedules.length > 0;

  let backgroundColor = "";
  let scheduleTitle = "";
  let isCurrentUser = false;

  let currentUserSchedule: Schedule | undefined;

  if (isReserved) {
    currentUserSchedule = slotSchedules.find((schedule) => schedule.userId === currentUserId);

    if (currentUserSchedule) {
      backgroundColor = "bg-purple-700";
      isCurrentUser = true;
    } else {
      backgroundColor = "bg-gray-300";
      scheduleTitle = slotSchedules[0] ? slotSchedules[0].title : "";
    }
  }

  return (
    <div className="h-55 border-l-1 border-gray-400">
      <div
        className={`border-y-custom-black border-y-1 group relative h-12 w-[50px] ${backgroundColor}`}
        onClick={() => {
          if (isCurrentUser && currentUserSchedule) {
            onSelectSchedule(currentUserSchedule);
          }
        }}
      >
        {/* 다른 사용자의 예약인 경우 툴팁 표시 */}
        {/* {isReserved && !isCurrentUser && (
        <div className="absolute inset-0">
          <div className="fixed top-full z-50 hidden w-max -translate-x-1/2 transform rounded bg-black p-1 text-xs text-white opacity-80 group-hover:block">
            {scheduleTitle}
          </div>
        </div> 
      )} */}
      </div>
    </div>
  );
};
