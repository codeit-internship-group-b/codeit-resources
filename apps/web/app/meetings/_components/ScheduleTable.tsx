// components/ScheduleTable.tsx

import React from "react";
import ScheduleRow from "./ScheduleRow";
import TimeText from "./TimeText";
import RoomName from "./RoomName";

interface Schedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  userId: string;
}

interface Room {
  id: string;
  title: string;
  schedules: Schedule[];
}

interface ScheduleTableProps {
  rooms: Room[];
  selectedDate: string;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ rooms, selectedDate }) => {
  return (
    <div>
      {rooms.map((room) => (
        <>
          <RoomName key={room.title} name={room.title} />
          <div key={room.id} className="my-24 overflow-x-auto">
            <TimeText />
            <div className="ml-36">
              <ScheduleRow schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)} />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ScheduleTable;
