// components/TimeSlot.tsx

import React from "react";

interface Schedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  userId: string;
}

interface TimeSlotProps {
  index: number;
  time: string;
  schedule?: Schedule;
  slotWidth: number;
  slotHeight: number;
  onSlotClick?: (time: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ index, time, schedule, slotWidth, slotHeight, onSlotClick }) => {
  const isScheduled = schedule !== undefined;

  return (
    <div
      className="relative min-w-72"
      style={{ width: slotWidth, height: slotHeight }}
      onClick={() => onSlotClick && onSlotClick(time)}
    >
      {/* 타임슬롯 배경 */}
      {!isScheduled && <div className="h-full w-full cursor-pointer hover:bg-gray-200" />}
      {/* 스케줄 표시 */}
      {isScheduled && schedule ? (
        <div
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            // 스케줄 클릭 이벤트 처리
          }}
        >
          {schedule.title}
        </div>
      ) : null}
      {/* 30분, 1시간마다 다른 border 표시 */}
      {index % 2 === 0 ? (
        <div className="absolute left-0 top-0 h-full border-l border-gray-300" />
      ) : (
        <div className="absolute bottom-0 left-0 h-1/2 border-l border-gray-300" />
      )}
    </div>
  );
};

export default TimeSlot;
