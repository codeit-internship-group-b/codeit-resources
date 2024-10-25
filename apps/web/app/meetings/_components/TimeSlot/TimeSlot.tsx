import React from "react";
import { SlotContent } from "./SlotContent";
import { SelectedRangeHighlighter } from "./SelectedRangeHighlighter";
import { type Schedule } from "@/app/types/scheduletypes";

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
    const hour = parseInt(hourStr!, 10);
    const minute = parseInt(minuteStr!, 10);
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

  return (
    <div
      className={`h-56 ${slotIndex % 2 === 0 ? "" : "border-r-1"} border-gray-400 ${
        isCurrentUser ? "hover:outline-purple-40 hover:bg-purple-200" : "hover:bg-gray-60"
      } hover:outline-1`}
      onClick={() => {
        if (!isReserved) {
          onCreateReservation(time);
        }
      }}
    >
      <SelectedRangeHighlighter isInSelectedRange={isInSelectedRange} />
      <SlotContent
        isCurrentUser={isCurrentUser}
        isReserved={isReserved}
        currentUserSchedule={currentUserSchedule}
        backgroundColor={backgroundColor}
        scheduleTitle={scheduleTitle}
        onSelectSchedule={onSelectSchedule}
      />
      <div className="border-b-1 border-gray-10 mt-12 border-dotted" />
      {slotIndex % 2 !== 0 && <div className="border-l-1 border-gray-10 -mt-9 h-20" />}
    </div>
  );
};
