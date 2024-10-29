"use client";

import { type ScheduleDate } from "@/app/types/scheduletypes";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import TimeText from "../ScheduleRow/TimeText";

type ScheduleTableMobileProps = ScheduleDate;

export default function ScheduleTableMobile(props: ScheduleTableMobileProps): JSX.Element {
  const { rooms, selectedDate } = props;

  return (
    <div className="mx-16 my-24 block w-full md:hidden">
      {rooms.map((room) => (
        <div key={room.id} className="mb-26">
          <RoomName name={room.title} />
          <div className="mt-30 no-scrollbar overflow-x-auto pb-20">
            <TimeText />
            <div className="ml-36 mt-8">
              <ScheduleRow schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
