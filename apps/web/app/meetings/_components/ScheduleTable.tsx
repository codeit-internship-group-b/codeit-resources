// components/ScheduleTable.tsx

import React from "react";
import ScheduleRow from "./Schedule/ScheduleRow";
import RoomName from "./Schedule/RoomName";
import CurrentTimeIndicator from "./Schedule/ScheduleRow/CurrentTimeIndicator";
import TimeText from "./Schedule/ScheduleRow/TimeText";

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
    <div className="w-full">
      {/* 모바일 레이아웃 */}
      {rooms.map((room) => (
        <div key={room.id} className="block md:hidden">
          <RoomName name={room.title} />
          <div className="my-24 h-auto overflow-x-auto">
            <TimeText />
            <div className="mb-30 ml-36">
              <ScheduleRow schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)} />
            </div>
          </div>
        </div>
      ))}

      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:block">
        <div className="flex">
          {/* 미팅룸 이름 영역 */}
          <div className="my-34 w-1/8 ml-30 flex flex-col justify-between border-r border-gray-200">
            {rooms.map((room) => (
              <RoomName key={room.id} name={room.title} />
            ))}
          </div>
          {/* 시간표 영역 */}
          <div className="relative w-3/4 overflow-x-auto">
            {/* 시간 라벨 */}
            <TimeText />

            {/* 스케줄 리스트 */}
            {rooms.map((room) => (
              <ScheduleRow
                key={room.id}
                schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)}
                slotWidth={72} // 필요에 따라 조정
                slotHeight={80} // 필요에 따라 조정
              />
            ))}

            {/* 현재 시간 표시 */}
            <CurrentTimeIndicator slotWidth={72} startHour={0} endHour={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
