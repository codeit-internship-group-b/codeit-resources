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

export default function ScheduleTableMobile(props: ScheduleTableMobileProps): JSX.Element {
  const { rooms, meetingsData, selectedDate } = props;

  return (
    <div className="mx-16 my-24 block w-full md:hidden">
      {rooms.map((room) => {
        // 해당 방의 스케줄 필터링
        const roomSchedules = meetingsData.filter((schedule) => {
          const scheduleItemId = typeof schedule.item === "string" ? schedule.item : schedule.item._id;

          // 방 ID가 일치하는지 확인
          const isSameRoom = scheduleItemId === room._id;

          // 예약 날짜가 selectedDate와 같은지 확인
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
                <ScheduleRow schedules={roomSchedules} room={room.name} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
