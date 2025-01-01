/* eslint-disable react/no-array-index-key */
import { memo } from "react";
import RoomNameSkeleton from "./RoomNameSkeleton";
import ScheduleSlotSkeleton from "./ScheduleSlotSkeleton";
import TimeTextSkeleton from "./TimeTextSkeleton";

function MeetingsSkeleton(): JSX.Element {
  return (
    <div className="my-24 hidden w-full md:block">
      <div className="flex">
        <div className="w-1/8 ml-30 mt-32 flex flex-col">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="mb-32 mr-20 mt-10" key={`room-skeleton-${index}`}>
              <RoomNameSkeleton />
            </div>
          ))}
        </div>
        <div className="no-scrollbar relative h-full w-3/4 overflow-y-hidden overflow-x-scroll">
          <TimeTextSkeleton />
          {Array.from({ length: 1 }).map((_, index) => (
            <div className="mb-30 ml-36 mt-10" key={`slot-skeleton-${index}`}>
              <ScheduleSlotSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(MeetingsSkeleton);
