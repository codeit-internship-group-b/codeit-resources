/* eslint-disable */
import React, { useState } from "react";
import { TimeSlot } from "./TimeSlot";
import { MeetingBottomSheet } from "./MeetingBottomSheet";

interface Schedule {
  start: string;
  end: string;
  title: string;
  userId: string;
}

interface RoomScheduleProps {
  roomName: string;
  schedules: Schedule[];
  currentUserId: string;
}

export const RoomSchedule: React.FC<RoomScheduleProps> = ({ roomName, schedules, currentUserId }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  // 00:00부터 23:30까지 30분 간격의 슬롯 생성
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  return (
    <div>
      <div className="rounded-8 text-custom-black/80 border-1 my-28 flex h-48 w-80 items-center justify-center gap-8 border-gray-200/10 bg-white">
        {roomName}
      </div>

      {/* 스케줄 그리드 */}
      <div className="pl-50 flex flex-col overflow-x-auto">
        <div className="flex">
          {Array.from({ length: 24 }, (_, i) => {
            const hourLabel = i < 10 ? `0${i}:00` : `${i}:00`;
            const firstSlotIndex = i * 2;
            const secondSlotIndex = firstSlotIndex + 1;
            const firstSlot = timeSlots[firstSlotIndex];
            const secondSlot = timeSlots[secondSlotIndex];

            return (
              <div key={i} className="flex flex-col items-center">
                <div className="-ml-100 text-custom-black/50 text-xs-semibold w-[100px] text-center">{hourLabel}</div>

                <div className="flex">
                  {firstSlot && (
                    <TimeSlot
                      key={firstSlot}
                      time={firstSlot}
                      schedules={schedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                    />
                  )}
                  {secondSlot && (
                    <TimeSlot
                      key={secondSlot}
                      time={secondSlot}
                      schedules={schedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MeetingBottomSheet 컴포넌트 */}
      {selectedSchedule && (
        <MeetingBottomSheet
          isOpen={!!selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          schedule={selectedSchedule}
        />
      )}
    </div>
  );
};
