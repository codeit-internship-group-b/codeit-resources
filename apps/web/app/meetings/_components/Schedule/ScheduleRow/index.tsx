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

  // 시간 문자열을 분으로 변환하는 함수
  const timeToMinutes = (time: string): number => {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    return hours * 60 + minutes;
  };

  // 선택된 시간과 스케줄 상태 관리
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [clickedSlotIndex, setClickedSlotIndex] = useState<number | null>(null);

  // zustand 스토어에서 Sidebar 열고 닫기 메서드 가져오기
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const handleSlotClick = (index: number, schedule?: Schedule): void => {
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setSelectedSchedule(schedule || null);
    setClickedSlotIndex(index);
  };

  // selectedTime 또는 selectedSchedule이 변경된 후 Sidebar 열기
  useEffect(() => {
    if (selectedTime || selectedSchedule) {
      openSidebar();
    }
  }, [selectedTime, selectedSchedule, openSidebar]);

  // Sidebar 닫기 함수
  const handleClose = (): void => {
    closeSidebar();
    setClickedSlotIndex(null);
    setSelectedSchedule(null);
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      {/* 스케줄 슬롯 생성 */}
      <div className="absolute left-0 top-0 flex">
        {Array.from({ length: totalSlots }).map((_, index) => {
          return (
            <ScheduleSlot
              key={`slot-${index}-${startHour}`} // 고유한 문자열 추가
              index={index}
              slotWidth={slotWidth}
              slotHeight={slotHeight}
              onClick={handleSlotClick}
            />
          );
        })}
      </div>

      {/* 현재 시간 표시기 */}
      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      {/* 스케줄 아이템 표시 */}
      {schedules.map((schedule) => {
        const startMinutes = timeToMinutes(schedule.start_time) - startHour * 60;
        const endMinutes = timeToMinutes(schedule.end_time) - startHour * 60;
        const scheduleDuration = endMinutes - startMinutes;

        // 스케줄이 타임라인 범위를 벗어날 경우 표시하지 않음
        if (startMinutes < 0 || endMinutes > totalMinutes) {
          return null;
        }

        // 스케줄 위치 및 너비 계산
        const leftPosition = (startMinutes / totalMinutes) * (slotWidth * totalSlots);
        const scheduleWidth = (scheduleDuration / totalMinutes) * (slotWidth * totalSlots);

        return (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            leftPosition={leftPosition}
            scheduleWidth={scheduleWidth}
            isCurrentUser={schedule.userId === "1"}
            onClick={() => {
              handleSlotClick(-1, schedule);
            }}
          />
        );
      })}

      {/* Reservation 시트 */}
      {selectedTime ? (
        <>
          <div className="!hidden md:block">
            <DesktopReservationSheet
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
            />
          </div>

          <div className="block md:hidden">
            <MobileReservationSheet
              isOpen={isSidebarOpen}
              onClose={handleClose}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
