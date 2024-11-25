"use client";

import { type TBaseItem } from "@repo/types";
import { type IReservation } from "@repo/types/src/reservationType";
import { getRoomSchedules } from "@/app/utils/getRoomSchedules";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import TimeText from "../ScheduleRow/TimeText";

interface ScheduleTableMobileProps {
  rooms: TBaseItem[];
  meetingsData: IReservation[];
  selectedDate: string;
}

export default function ScheduleTableMobile(props: ScheduleTableMobileProps): JSX.Element {
  const { rooms, meetingsData, selectedDate } = props;

  return (
    <div className="mx-16 my-24 block w-full md:hidden">
      {rooms.map((room) => {
        const roomSchedules = getRoomSchedules(room, meetingsData, selectedDate);

        return (
          <div key={room._id} className="mb-26">
            <RoomName>{room.name}</RoomName>
            <div className="mt-30 no-scrollbar overflow-x-auto pb-20">
              <TimeText />
              <div className="ml-36 mt-8">
                <ScheduleRow
                  schedules={roomSchedules}
                  room={{ name: room.name, _id: room._id }}
                  slotWidth={72}
                  slotHeight={80}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
