"use client";

import { type ScheduleDate } from "@/app/types/scheduletypes";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import CurrentTimeIndicator from "../ScheduleRow/CurrentTimeIndicator";
import TimeText from "../ScheduleRow/TimeText";

type ScheduleTableDesktopProps = ScheduleDate;

export default function ScheduleTableDesktop(props: ScheduleTableDesktopProps): JSX.Element {
  const { rooms, selectedDate } = props;

  return (
    <div className="mx-16 my-24 hidden w-full md:block">
      <div className="flex">
        <div className="w-1/8 ml-30 mt-32 flex flex-col">
          {rooms.map((room) => (
            <div className="mb-38 mt-10" key={room.id}>
              <RoomName name={room.title} />
            </div>
          ))}
        </div>
        <div className="no-scrollbar relative h-full w-3/4 overflow-x-scroll">
          <TimeText />
          {rooms.map((room) => (
            <div className="mb-30 ml-36 mt-10" key={room.title}>
              <ScheduleRow
                schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)}
                slotWidth={72}
                slotHeight={80}
              />
            </div>
          ))}
          <CurrentTimeIndicator slotWidth={72} startHour={0} endHour={24} />
        </div>
      </div>
    </div>
  );
}
