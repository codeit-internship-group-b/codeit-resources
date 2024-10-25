import React from "react";
import { type Schedule } from "../../types/scheduletypes";
import { RoomHeader } from "./RoomHeader";
import { TimeHeader } from "./TimeHeader";
import { TimeSlot } from "./TimeSlot/TimeSlot";

interface DesktopRoomScheduleProps {
  roomName: string;
  schedules: Schedule[];
  currentUserId: string;
  onSelectSchedule: (schedule: Schedule) => void;
  onCreateReservation: (time: string) => void;
}

export const DesktopRoomSchedule: React.FC<DesktopRoomScheduleProps> = ({
  roomName,
  schedules,
  currentUserId,
  onSelectSchedule,
  onCreateReservation,
}) => {
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  return (
    <div className="flex">
      {/* 미팅 룸 리스트 */}
      <div className="w-1/4 border-r border-gray-300 p-4">
        <RoomHeader roomName={roomName} />
        {/* 여기서 추가적으로 미팅 룸 목록을 순서대로 렌더링할 수 있습니다 */}
      </div>

      {/* 시간표 */}
      <div className="w-3/4 overflow-x-auto p-4">
        <div className="flex">
          {Array.from({ length: 24 }, (_, i) => (
            <TimeHeader key={i} hour={i} />
          ))}
        </div>
        <div className="flex">
          {timeSlots.map((time, index) => (
            <TimeSlot
              key={time}
              time={time}
              schedules={schedules}
              currentUserId={currentUserId}
              onSelectSchedule={onSelectSchedule}
              onCreateReservation={onCreateReservation}
              slotIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
