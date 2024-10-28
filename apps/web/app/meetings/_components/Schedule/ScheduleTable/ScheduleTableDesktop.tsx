"use client";

import RoomName from "../RoomName";
import ScheduleRow from "../ScheduleRow";
import CurrentTimeIndicator from "../ScheduleRow/CurrentTimeIndicator";
import TimeText from "../ScheduleRow/TimeText";
import { type Room } from "@/app/types/scheduletypes";

interface ScheduleTableDesktopProps {
  rooms: Room[];
  selectedDate: string;
}

const ScheduleTableDesktop: React.FC<ScheduleTableDesktopProps> = ({ rooms, selectedDate }) => {
  return (
    <div className="mx-16 my-24 hidden w-full md:block">
      <div className="flex">
        {/* 미팅룸 이름 영역 */}
        <div className="w-1/8 ml-30 mt-32 flex flex-col">
          {rooms.map((room) => (
            <div className="mb-38 mt-10" key={room.id}>
              <RoomName name={room.title} />
            </div>
          ))}
        </div>
        {/* 시간표 영역 */}
        <div className="relative h-full w-3/4 overflow-x-auto">
          {/* 시간 라벨 */}
          <TimeText />

          {/* 스케줄 리스트 */}
          {rooms.map((room) => (
            <div className="mb-30 ml-36 mt-10" key={room.id}>
              <ScheduleRow
                schedules={room.schedules.filter((schedule) => schedule.date === selectedDate)}
                slotWidth={72} // 필요에 따라 조정
                slotHeight={80} // 필요에 따라 조정
              />
            </div>
          ))}

          {/* 현재 시간 표시 */}
          <CurrentTimeIndicator slotWidth={72} startHour={0} endHour={24} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTableDesktop;
