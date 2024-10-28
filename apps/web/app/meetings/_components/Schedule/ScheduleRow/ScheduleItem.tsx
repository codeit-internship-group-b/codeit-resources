/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { type Schedule } from "@/app/types/scheduletypes";
import ScheduleTooltip from "./ScheduleTooltip";

interface ScheduleItemProps {
  schedule: Schedule;
  leftPosition: number;
  scheduleWidth: number;
  isCurrentUser: boolean;
  onClick: () => void;
}

export default function ScheduleItem(props: ScheduleItemProps): JSX.Element {
  const { schedule, leftPosition, scheduleWidth, isCurrentUser, onClick } = props;

  const backgroundColor = isCurrentUser ? "bg-purple-400" : "bg-gray-70 hover:bg-gray-80";
  const hoverColor = isCurrentUser ? "hover:bg-purple-200" : "hover:bg-gray-200/10";

  return (
    <div
      className={`transition-linear absolute h-full ${hoverColor}`}
      style={{
        left: `${String(leftPosition)}px`,
        width: `${String(scheduleWidth)}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div
        className={`transition-linear group relative left-0 top-20 flex h-20 cursor-pointer items-center justify-center ${backgroundColor} text-white`}
        style={{
          width: "100%",
        }}
        role="button"
        tabIndex={0}
      >
        {isCurrentUser ? null : <ScheduleTooltip title={schedule.title} />}
      </div>
    </div>
  );
}
