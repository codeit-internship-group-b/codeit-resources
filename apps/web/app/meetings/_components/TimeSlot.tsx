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
  slotIndex: number;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ time, schedules, currentUserId, onSelectSchedule, slotIndex }) => {
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
      scheduleTitle = slotSchedules[0]?.title || "";
    }
  }

  return (
    <div className={`h-56 ${slotIndex % 2 === 0 ? "border-l-1" : "border-x-1"} border-gray-400`}>
      <div
        className={`group relative mt-20 h-12 w-[50px] ${backgroundColor}`}
        onClick={() => {
          if (isCurrentUser && currentUserSchedule) {
            onSelectSchedule(currentUserSchedule);
          }
        }}
       />
      <div className="border-b-1 border-gray-10 -mt-6 border-dotted" />
    </div>
  );
};
