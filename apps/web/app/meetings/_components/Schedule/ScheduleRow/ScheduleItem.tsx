import React from "react";
import ScheduleTooltip from "./ScheduleTooltip";

interface Schedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  userId: string;
}

interface ScheduleItemProps {
  schedule: Schedule;
  leftPosition: number;
  scheduleWidth: number;
  isCurrentUser: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, leftPosition, scheduleWidth, isCurrentUser }) => {
  const backgroundColor = isCurrentUser ? "bg-purple-400" : "bg-gray-70 hover:bg-gray-80";
  const hoverColor = isCurrentUser ? "hover:bg-purple-200" : "hover:bg-gray-200/10";

  return (
    <div
      className={`transition-linear absolute h-full ${hoverColor}`}
      style={{
        left: `${leftPosition}px`,
        width: `${scheduleWidth}px`,
      }}
    >
      <div
        className={`transition-linear group relative left-0 top-20 flex h-20 cursor-pointer items-center justify-center ${backgroundColor} text-white`}
        style={{
          width: "100%",
        }}
        onClick={(e) => {
          e.stopPropagation();
          // 스케줄 클릭 이벤트 처리
        }}
      >
        {isCurrentUser ? null : <ScheduleTooltip title={schedule.title} />}
      </div>
    </div>
  );
};

export default ScheduleItem;
