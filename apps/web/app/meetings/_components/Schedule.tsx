/* eslint-disable */
"use client";

import React, { useState } from "react";
import { TimeSlot } from "./TimeSlot";
import { TimeHeader } from "./TimeHeader";
import { RoomHeader } from "./RoomHeader";
import { MeetingBottomSheet } from "./MeetingBottomSheet";

interface Schedule {
  id: string;
  date: string;
  start_time: string; // HH:mm 형식
  end_time: string; // HH:mm 형식
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

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  return (
    <div>
      <RoomHeader roomName={roomName} />

      <div className="pl-50 flex flex-col overflow-x-auto">
        <div className="flex">
          {Array.from({ length: 24 }, (_, i) => {
            const firstSlotIndex = i * 2;
            const secondSlotIndex = firstSlotIndex + 1;
            const firstSlot = timeSlots[firstSlotIndex];
            const secondSlot = timeSlots[secondSlotIndex];

            return (
              <div key={i} className="flex flex-col items-center">
                <TimeHeader hour={i} />

                <div className="flex">
                  {firstSlot && (
                    <TimeSlot
                      key={firstSlot}
                      time={firstSlot}
                      schedules={schedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                      slotIndex={firstSlotIndex}
                    />
                  )}
                  {secondSlot && (
                    <TimeSlot
                      key={secondSlot}
                      time={secondSlot}
                      schedules={schedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                      slotIndex={secondSlotIndex}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
