/* eslint-disable */
"use client";
// RoomSchedule.tsx

import React, { useState } from "react";
import { Schedule } from "@/app/types/scheduletypes";
import { MeetingBottomSheet } from "./MeetingBottomSheet";
import { ReservationBottomSheet } from "./ReservationBottomSheet"; // 추가된 컴포넌트
import { RoomHeader } from "./RoomHeader";
import { TimeHeader } from "./TimeHeader";
import { TimeSlot } from "./TimeSlot";

interface RoomScheduleProps {
  roomName: string;
  schedules: Schedule[];
  currentUserId: string;
}

export const RoomSchedule: React.FC<RoomScheduleProps> = ({ roomName, schedules, currentUserId }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false); // 예약 바텀시트 열림 여부
  const [reservationTime, setReservationTime] = useState<string>(""); // 선택된 예약 시간
  const [userSchedules, setUserSchedules] = useState<Schedule[]>(schedules); // 사용자 예약 상태

  const handleCreateReservation = (time: string) => {
    setReservationTime(time);
    setIsReservationOpen(true);
  };

  const handleAddSchedule = (newSchedule: Schedule) => {
    setUserSchedules([...userSchedules, newSchedule]);
    setIsReservationOpen(false);
  };

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  return (
    <div>
      <RoomHeader roomName={roomName} />

      <div className="pl-50 relative flex flex-col overflow-x-auto">
        <div className="flex">
          {/* TimeSlot 렌더링 */}
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
                      schedules={userSchedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                      onCreateReservation={handleCreateReservation} // 추가된 props
                      slotIndex={firstSlotIndex}
                    />
                  )}
                  {secondSlot && (
                    <TimeSlot
                      key={secondSlot}
                      time={secondSlot}
                      schedules={userSchedules}
                      currentUserId={currentUserId}
                      onSelectSchedule={setSelectedSchedule}
                      onCreateReservation={handleCreateReservation} // 추가된 props
                      slotIndex={secondSlotIndex}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 기존 예약 상세 바텀시트 */}
      {selectedSchedule && (
        <MeetingBottomSheet
          isOpen={!!selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          schedule={selectedSchedule}
        />
      )}

      {/* 새로운 예약 생성 바텀시트 */}
      {isReservationOpen && (
        <ReservationBottomSheet
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
          initialTime={reservationTime}
          schedules={userSchedules}
          onAddSchedule={handleAddSchedule}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};
