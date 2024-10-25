import React, { useState } from "react";
import { type Schedule } from "../../types/scheduletypes";
import { MeetingBottomSheet } from "./MeetingBottomSheet";
import { ReservationBottomSheet } from "./ReservationBottomSheet";
import { RoomHeader } from "./RoomHeader";
import { TimeHeader } from "./TimeHeader";
import { TimeSlot } from "./TimeSlot/TimeSlot";
import { DesktopRoomSchedule } from "./DesktopRoomSchedule";

interface RoomScheduleProps {
  roomName: string;
  schedules: Schedule[];
  currentUserId: string;
}

export const RoomSchedule: React.FC<RoomScheduleProps> = ({ roomName, schedules, currentUserId }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationTime, setReservationTime] = useState<string>("");
  const [userSchedules, setUserSchedules] = useState<Schedule[]>(schedules);

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
      {/* 모바일 버전 Room Schedule */}
      <div className="block md:hidden">
        <RoomHeader roomName={roomName} />

        <div className="pl-50 relative flex flex-col overflow-x-auto">
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
                    {firstSlot ? (
                      <TimeSlot
                        key={firstSlot}
                        time={firstSlot}
                        schedules={userSchedules}
                        currentUserId={currentUserId}
                        onSelectSchedule={setSelectedSchedule}
                        onCreateReservation={handleCreateReservation}
                        slotIndex={firstSlotIndex}
                      />
                    ) : null}
                    {secondSlot ? (
                      <TimeSlot
                        key={secondSlot}
                        time={secondSlot}
                        schedules={userSchedules}
                        currentUserId={currentUserId}
                        onSelectSchedule={setSelectedSchedule}
                        onCreateReservation={handleCreateReservation}
                        slotIndex={secondSlotIndex}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 데스크탑 버전 Room Schedule */}
      <div className="hidden md:block">
        <DesktopRoomSchedule
          roomName={roomName}
          schedules={userSchedules}
          currentUserId={currentUserId}
          onSelectSchedule={setSelectedSchedule}
          onCreateReservation={handleCreateReservation}
        />
      </div>

      {selectedSchedule ? (
        <MeetingBottomSheet
          isOpen={Boolean(selectedSchedule)}
          onClose={() => {
            setSelectedSchedule(null);
          }}
          schedule={selectedSchedule}
        />
      ) : null}

      {isReservationOpen ? (
        <ReservationBottomSheet
          isOpen={isReservationOpen}
          onClose={() => {
            setIsReservationOpen(false);
          }}
          initialTime={reservationTime}
          schedules={userSchedules}
          onAddSchedule={handleAddSchedule}
          currentUserId={currentUserId}
        />
      ) : null}
    </div>
  );
};
