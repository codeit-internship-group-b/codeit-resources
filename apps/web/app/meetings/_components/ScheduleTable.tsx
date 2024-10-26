// components/ScheduleTable.tsx

import React from "react";
import ScheduleRow from "./ScheduleRow";
import TimeText from "./TimeText";

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
      <TimeText />
      {rooms.map((room) => (
        <div key={room.id} className="mb-4">
          <ScheduleRow schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)} />
        </div>
      ))}
    </div>
  );
};

export default ScheduleTable;
