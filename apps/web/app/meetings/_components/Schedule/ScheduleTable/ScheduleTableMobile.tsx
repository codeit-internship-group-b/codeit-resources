"use client";

import React from "react";
import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import TimeText from "../ScheduleRow/TimeText";
import { type Room } from "@/app/types/scheduletypes";

interface ScheduleTableMobileProps {
  rooms: Room[];
  selectedDate: string;
}

const ScheduleTableMobile: React.FC<ScheduleTableMobileProps> = ({ rooms, selectedDate }) => {
  return (
    <div className="mx-16 my-24 block w-full md:hidden">
      {rooms.map((room) => (
        <div key={room.id} className="mb-24">
          <RoomName name={room.title} />
          <div className="mt-6 h-auto overflow-x-auto">
            <TimeText />
            <div className="ml-36 mt-8">
              <ScheduleRow schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleTableMobile;
