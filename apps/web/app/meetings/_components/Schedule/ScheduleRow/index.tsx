// ScheduleRow.tsx

import { useState } from "react";
import { type IReservation } from "@repo/types";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import { useSlotReservations } from "@/app/_hooks/useSlotReservations";
import ReservationSheets from "../../Reservation/ReservationSheets";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import ScheduleSlots from "./ScheduleSlots";

interface ScheduleRowProps {
  schedules: IReservation[];
  room: SelectedRoom;
  slotWidth?: number;
  slotHeight?: number;
  onSlotClick?: (time: string, schedule?: IReservation, room?: { name: string; _id: string }) => void;
}

export default function ScheduleRow(props: ScheduleRowProps): JSX.Element {
  const { schedules, room, slotHeight = 80, slotWidth = 72 } = props;

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<IReservation | null>(null);

  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const startHour = 0;
  const endHour = 24;
  const minutesPerSlot = 30;

  const slotReservations = useSlotReservations(schedules, startHour, endHour, minutesPerSlot);

  const handleSlotClick = (index: number, schedule?: IReservation): void => {
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setSelectedSchedule(schedule ?? null);
    openSidebar();
  };

  const handleClose = (): void => {
    closeSidebar();
    setSelectedSchedule(null);
    setSelectedTime(null);
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      <div className="absolute left-0 top-0 flex">
        <ScheduleSlots
          slotReservations={slotReservations}
          slotWidth={slotWidth}
          slotHeight={slotHeight}
          onSlotClick={handleSlotClick}
        />
      </div>

      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      <ReservationSheets
        isOpen={isSidebarOpen}
        onClose={handleClose}
        selectedTime={selectedTime}
        selectedSchedule={selectedSchedule}
        selectedRoom={room}
      />
    </div>
  );
}
