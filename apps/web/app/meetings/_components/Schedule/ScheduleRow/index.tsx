"use client";

import { useState } from "react";
import MobileReservationSheet from "../../Reservation/MobileReservationSheet";
import DesktopReservationSheet from "../../Reservation/DesktopReservationSheet";
import ScheduleSlot from "./ScheduleSlot";
import ScheduleItem from "./ScheduleItem";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import { type Schedule } from "@/app/types/scheduletypes";

interface ScheduleRowProps {
  schedules: Schedule[];
  slotWidth?: number;
  slotHeight?: number;
  onSlotClick?: (time: string, schedule?: Schedule) => void;
}

export default function ScheduleRow(props: ScheduleRowProps): JSX.Element {
  const { schedules, slotHeight = 80, slotWidth = 72, onSlotClick } = props;

  const startHour = 0;
  const endHour = 24;
  const totalSlots = (endHour - startHour) * 2;
  const minutesPerSlot = 30;
  const totalMinutes = (endHour - startHour) * 60;

  const timeToMinutes = (time: string): number => {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    return hours * 60 + minutes;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clickedSlotIndex, setClickedSlotIndex] = useState<number | null>(null);

  const currentUserId = "1";

  const handleSlotClick = (index: number, schedule?: Schedule): void => {
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setClickedSlotIndex(index);
    setIsOpen(true);

    if (onSlotClick) {
      onSlotClick(timeString, schedule);
    }
  };

  const handleClose = (): void => {
    setIsOpen(false);
    setClickedSlotIndex(null);
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      <div className="absolute left-0 top-0 flex">
        {Array.from({ length: totalSlots }).map((_, index) => {
          const isClicked = index === clickedSlotIndex;
          return (
            <ScheduleSlot
              key={totalSlots}
              index={index}
              slotWidth={slotWidth}
              slotHeight={slotHeight}
              isClicked={isClicked}
              onClick={handleSlotClick}
            />
          );
        })}
      </div>

      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      {schedules.map((schedule) => {
        const startMinutes = timeToMinutes(schedule.start_time) - startHour * 60;
        const endMinutes = timeToMinutes(schedule.end_time) - startHour * 60;
        const scheduleDuration = endMinutes - startMinutes;

        if (startMinutes < 0 || endMinutes > totalMinutes) {
          return null;
        }

        const leftPosition = (startMinutes / totalMinutes) * (slotWidth * totalSlots);
        const scheduleWidth = (scheduleDuration / totalMinutes) * (slotWidth * totalSlots);

        const isCurrentUser = schedule.userId === currentUserId;

        return (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            leftPosition={leftPosition}
            scheduleWidth={scheduleWidth}
            isCurrentUser={isCurrentUser}
            onClick={() => {
              handleSlotClick(-1, schedule);
            }}
          />
        );
      })}

      {selectedTime ? (
        <>
          <div className="hidden md:block">
            <DesktopReservationSheet isOpen={isOpen} onClose={handleClose} selectedTime={selectedTime} />
          </div>

          <div className="block md:hidden">
            <MobileReservationSheet isOpen={isOpen} onClose={handleClose} selectedTime={selectedTime} />
          </div>
        </>
      ) : null}
    </div>
  );
}
