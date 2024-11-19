// ScheduleRow.tsx

import { useState } from "react";
import { type IReservation } from "@repo/types";
import { parseISO } from "date-fns";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import MobileReservationSheet from "../../Reservation/MobileReservationSheet";
import DesktopReservationSheet from "../../Reservation/DesktopReservationSheet";
import ScheduleSlot from "./ScheduleSlot";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

interface ScheduleRowProps {
  schedules: IReservation[];
  room: SelectedRoom;
  slotWidth?: number;
  slotHeight?: number;
  onSlotClick?: (time: string, schedule?: IReservation, room?: { name: string; _id: string }) => void;
}

export default function ScheduleRow(props: ScheduleRowProps): JSX.Element {
  const { schedules, room, slotHeight = 80, slotWidth = 72 } = props;

  const user = useAuthStore((state) => state.user);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<IReservation | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom | null>(room || null);

  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const startHour = 0;
  const endHour = 24;
  const totalSlots = (endHour - startHour) * 2; // 30분 단위
  const minutesPerSlot = 30;
  const totalMinutes = (endHour - startHour) * 60;

  // timeToMinutes 함수 선언
  const timeToMinutes = (time: Date | string): number => {
    const date = typeof time === "string" ? parseISO(time) : time;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes;
  };

  // 슬롯별로 예약 상태를 저장하는 배열 생성
  const slotReservations = Array(totalSlots).fill(null) as Array<IReservation | null>;

  // 예약 정보를 슬롯 인덱스에 매핑
  schedules.forEach((schedule) => {
    const startMinutes = timeToMinutes(schedule.startAt) - startHour * 60;
    const endMinutes = timeToMinutes(schedule.endAt) - startHour * 60;

    const startIndex = Math.floor(startMinutes / minutesPerSlot);
    const endIndex = Math.ceil(endMinutes / minutesPerSlot);

    for (let i = startIndex; i < endIndex; i++) {
      slotReservations[i] = schedule;
    }
  });

  // 슬롯 생성
  const slots = [];
  for (let i = 0; i < totalSlots; i++) {
    const schedule = slotReservations[i];
    if (schedule) {
      // 예약된 슬롯의 시작 위치를 찾기 위해 이전 슬롯을 확인
      if (i === 0 || slotReservations[i - 1] !== schedule) {
        // 예약된 슬롯의 시작
        const start = i;
        let end = i;
        // 예약된 슬롯의 끝 위치를 찾음
        while (end < totalSlots && slotReservations[end] === schedule) {
          end++;
        }
        slots.push(
          <ScheduleSlot
            key={`reserved-${start}-${end}`}
            index={start}
            slotCount={end - start}
            slotWidth={slotWidth}
            slotHeight={slotHeight}
            onClick={() => handleSlotClick(start, schedule)}
            isReserved={true}
            schedule={schedule}
          />,
        );
        i = end - 1; // 다음 반복에서 end 위치부터 시작
      }
    } else {
      // 예약되지 않은 슬롯은 개별적으로 렌더링
      slots.push(
        <ScheduleSlot
          key={`free-${i}`}
          index={i}
          slotCount={1}
          slotWidth={slotWidth}
          slotHeight={slotHeight}
          onClick={() => handleSlotClick(i)}
          isReserved={false}
        />,
      );
    }
  }

  const handleSlotClick = (index: number, schedule?: IReservation): void => {
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setSelectedSchedule(schedule ?? null);
    setSelectedRoom(room);
    openSidebar();
  };

  const handleClose = (): void => {
    closeSidebar();
    setSelectedSchedule(null);
    setSelectedTime(null);
    setSelectedRoom(null);
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      <div className="absolute left-0 top-0 flex">{slots}</div>

      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      {selectedTime && selectedRoom ? (
        <>
          <div className="!hidden md:block">
            <DesktopReservationSheet
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
              selectedRoom={room}
            />
          </div>

          <div className="block md:hidden">
            <MobileReservationSheet
              isOpen={isSidebarOpen}
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
              selectedRoom={room}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
