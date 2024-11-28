"use client";

import { memo } from "react";

function ScheduleSlotSkeleton(): JSX.Element {
  return (
    <div className="relative h-full w-full">
      {Array.from({ length: 7 }, (_, index) => (
        <div className="relative mb-36" style={{ width: 72 * 49, height: 80 }} key={`Slot-${index}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-1/2 h-16 w-full -translate-y-1/2 transform bg-gray-400" />
          </div>
          <div className="border-gray-10 md:h-110 absolute left-0 top-0 h-full border-l-2" />
        </div>
      ))}
    </div>
  );
}

export default memo(ScheduleSlotSkeleton);
