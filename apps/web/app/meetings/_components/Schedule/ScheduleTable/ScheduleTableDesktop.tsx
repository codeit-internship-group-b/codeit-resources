"use client";

import { type TBaseItem, type IReservation } from "@repo/types";
import { getRoomSchedules } from "@/app/utils/getRoomSchedules";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import CurrentTimeIndicator from "../ScheduleRow/CurrentTimeIndicator";
import TimeText from "../ScheduleRow/TimeText";

interface ScheduleTableDesktopProps {
  rooms: TBaseItem[];
  meetingsData: IReservation[];
  selectedDate: string;
}

export default function ScheduleTableDesktop(props: ScheduleTableDesktopProps): JSX.Element {
  const { rooms, meetingsData, selectedDate } = props;

  return (
    <div className="mx-16 my-24 hidden w-full md:block">
      <div className="flex">
        <div className="w-1/8 ml-30 mt-32 flex flex-col">
          {rooms.map((room) => (
            <div className="mb-38 mr-20 mt-10" key={room._id}>
              <RoomName name={room.name} />
            </div>
          ))}
        </div>
        <div className="no-scrollbar relative h-full w-3/4 overflow-y-hidden overflow-x-scroll">
          <TimeText />
          {rooms.map((room) => {
            const roomSchedules = getRoomSchedules(room, meetingsData, selectedDate);

            return (
              <div className="mb-30 ml-36 mt-10" key={room._id}>
                <ScheduleRow
                  schedules={roomSchedules}
                  slotWidth={72}
                  slotHeight={80}
                  room={{ name: room.name, _id: room._id }}
                />
              </div>
            );
          })}
          <div className="ml-36">
            <CurrentTimeIndicator slotWidth={72} startHour={0} endHour={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
