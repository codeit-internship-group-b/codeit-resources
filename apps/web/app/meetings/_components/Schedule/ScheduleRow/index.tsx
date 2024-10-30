"use client";

import { useEffect, useState } from "react";
import { type Schedule } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import MobileReservationSheet from "../../Reservation/MobileReservationSheet";
import DesktopReservationSheet from "../../Reservation/DesktopReservationSheet";
import ScheduleSlot from "./ScheduleSlot";
import ScheduleItem from "./ScheduleItem";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

interface ScheduleRowProps {
  schedules: Schedule[];
  room: string;
  slotWidth?: number;
  slotHeight?: number;
  onSlotClick?: (time: string, schedule?: Schedule, room?: string) => void;
}

export default function ScheduleRow(props: ScheduleRowProps): JSX.Element {
  const { schedules, room, slotHeight = 80, slotWidth = 72, onSlotClick } = props;

  const startHour = 0;
  const endHour = 24;
  const totalSlots = (endHour - startHour) * 2;
  const minutesPerSlot = 30;
  const totalMinutes = (endHour - startHour) * 60;

  // Convert time string to total minutes
  const timeToMinutes = (time: string): number => {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    return hours * 60 + minutes;
  };

  // State to manage selected slot information
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(room || null);

  // Sidebar management using Zustand
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  // Handle slot click to set selected schedule and open sidebar
  const handleSlotClick = (index: number, schedule?: Schedule): void => {
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setSelectedSchedule(schedule || null);
    setSelectedRoom(room);
    openSidebar();
  };

  // Close sidebar and reset selection
  const handleClose = (): void => {
    closeSidebar();
    setSelectedSchedule(null);
    setSelectedTime(null);
    setSelectedRoom(null);
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      {/* Generate schedule slots */}
      <div className="absolute left-0 top-0 flex">
        {Array.from({ length: totalSlots }).map((_, index) => (
          <ScheduleSlot
            key={`slot-${index}-${startHour}-${room}`}
            index={index}
            slotWidth={slotWidth}
            slotHeight={slotHeight}
            onClick={() => handleSlotClick(index)}
          />
        ))}
      </div>

      {/* Current time indicator for mobile view */}
      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      {/* Display schedule items */}
      {schedules.map((schedule) => {
        const startMinutes = timeToMinutes(schedule.start_time) - startHour * 60;
        const endMinutes = timeToMinutes(schedule.end_time) - startHour * 60;
        const scheduleDuration = endMinutes - startMinutes;

        // Skip schedules out of range
        if (startMinutes < 0 || endMinutes > totalMinutes) {
          return null;
        }

        // Calculate position and width of schedule
        const leftPosition = (startMinutes / totalMinutes) * (slotWidth * totalSlots);
        const scheduleWidth = (scheduleDuration / totalMinutes) * (slotWidth * totalSlots);

        return (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            leftPosition={leftPosition}
            scheduleWidth={scheduleWidth}
            isCurrentUser={schedule.userId === "1"}
            onClick={() => handleSlotClick(-1, schedule)}
          />
        );
      })}

      {/* Reservation sheet */}
      {selectedTime && selectedRoom ? (
        <>
          <div className="!hidden md:block">
            <DesktopReservationSheet
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
              selectedRoom={selectedRoom}
            />
          </div>

          <div className="block md:hidden">
            <MobileReservationSheet
              isOpen={isSidebarOpen}
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
              selectedRoom={selectedRoom}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
