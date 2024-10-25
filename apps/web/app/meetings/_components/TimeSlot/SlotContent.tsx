import React from "react";
import { type Schedule } from "@/app/types/scheduletypes";

interface SlotContentProps {
  isCurrentUser: boolean;
  isReserved: boolean;
  currentUserSchedule?: Schedule;
  backgroundColor: string;
  scheduleTitle: string;
  onSelectSchedule: (schedule: Schedule) => void;
}

export const SlotContent: React.FC<SlotContentProps> = ({
  isCurrentUser,
  isReserved,
  currentUserSchedule,
  backgroundColor,
  scheduleTitle,
  onSelectSchedule,
}) => {
  return (
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
      {!isCurrentUser && isReserved ? (
        <div className="transition-linear bg-gray-90 text-sm-medium absolute -bottom-14 left-1/2 hidden w-max -translate-x-1/2 -translate-y-full transform gap-16 whitespace-nowrap rounded px-8 py-4 text-white/90 group-hover:block">
          {scheduleTitle}
        </div>
      ) : null}
    </div>
  );
};
