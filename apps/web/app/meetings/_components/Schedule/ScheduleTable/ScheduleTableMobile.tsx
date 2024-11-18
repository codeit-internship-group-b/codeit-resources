"use client";

import { type TBaseItem } from "@repo/types";
import { type IReservation } from "@repo/types/src/reservationType";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import TimeText from "../ScheduleRow/TimeText";

interface ScheduleTableMobileProps {
  rooms: TBaseItem[];
  meetingsData: IReservation[];
  selectedDate: string;
}

// ScheduleTableMobile.tsx

export default function ScheduleTableMobile(props: ScheduleTableMobileProps): JSX.Element {
  const { rooms, meetingsData, selectedDate } = props;

  return (
    <div className="mx-16 my-24 block w-full md:hidden">
      {rooms.map((room) => {
        const roomSchedules = meetingsData.filter((schedule) => {
          const scheduleItemId = typeof schedule.item === "string" ? schedule.item : schedule.item._id;

          const isSameRoom = scheduleItemId === room._id;

          const scheduleDate = new Date(schedule.startAt).toISOString().split("T")[0];
          const isSameDate = scheduleDate === selectedDate;

          return isSameRoom && isSameDate;
        });

        return (
          <div key={room._id} className="mb-26">
            <RoomName name={room.name} />
            <div className="mt-30 no-scrollbar overflow-x-auto pb-20">
              <TimeText />
              <div className="ml-36 mt-8">
                <ScheduleRow
                  schedules={roomSchedules}
                  room={{ name: room.name, _id: room._id }} // name과 _id를 함께 전달
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
