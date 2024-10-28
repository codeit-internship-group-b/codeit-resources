import React, { useState } from "react";
import { DesktopReservationSheet } from "../../Reservation/DesktopReservationSheet";
import { MobileReservationSheet } from "../../Reservation/MobileReservationSheet";
import ScheduleSlot from "./ScheduleSlot";
import ScheduleItem from "./ScheduleItem";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

interface Schedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  userId: string;
}

interface ScheduleRowProps {
  schedules: Schedule[];
  slotWidth?: number;
  slotHeight?: number;
  onSlotClick?: (time: string) => void;
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({ schedules, slotWidth = 72, slotHeight = 80, onSlotClick }) => {
  const startHour = 0;
  const endHour = 24;
  const totalSlots = (endHour - startHour) * 2;
  const minutesPerSlot = 30;
  const totalMinutes = (endHour - startHour) * 60;

  const timeToMinutes = (time: string) => {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    return hours * 60 + minutes;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clickedSlotIndex, setClickedSlotIndex] = useState<number | null>(null);

  const currentUserId = "1"; // 현재 로그인한 사용자의 userId

  const handleSlotClick = (index: number) => {
    // 클릭된 슬롯의 시간을 계산
    const clickedTimeMinutes = startHour * 60 + index * minutesPerSlot;
    const hours = Math.floor(clickedTimeMinutes / 60);
    const minutes = clickedTimeMinutes % 60;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setSelectedTime(timeString);
    setClickedSlotIndex(index); // 클릭된 슬롯 인덱스 저장
    setIsOpen(true);

    if (onSlotClick) {
      onSlotClick(timeString);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setClickedSlotIndex(null); // 클릭된 슬롯 인덱스 초기화
  };

  return (
    <div className="relative my-4 mb-10" style={{ height: slotHeight }}>
      {/* 빈 슬롯들 */}
      <div className="absolute left-0 top-0 flex">
        {Array.from({ length: totalSlots }).map((_, index) => {
          const isClicked = index === clickedSlotIndex;
          return (
            <ScheduleSlot
              key={index}
              index={index}
              slotWidth={slotWidth}
              slotHeight={slotHeight}
              isClicked={isClicked}
              onClick={handleSlotClick}
            />
          );
        })}
      </div>

      {/* 현재 시간 표시 */}
      <div className="block md:hidden">
        <CurrentTimeIndicator slotWidth={slotWidth} startHour={startHour} endHour={endHour} />
      </div>

      {/* 스케줄 표시 */}
      {schedules.map((schedule) => {
        const startMinutes = timeToMinutes(schedule.start_time) - startHour * 60;
        const endMinutes = timeToMinutes(schedule.end_time) - startHour * 60;
        const scheduleDuration = endMinutes - startMinutes;

        // 스케줄이 타임라인 범위 내에 있는지 확인
        if (startMinutes < 0 || endMinutes > totalMinutes) {
          return null; // 타임라인 범위를 벗어나는 스케줄은 표시하지 않음
        }

        // 스케줄 바의 위치과 너비 계산
        const leftPosition = (startMinutes / totalMinutes) * (slotWidth * totalSlots);
        const scheduleWidth = (scheduleDuration / totalMinutes) * (slotWidth * totalSlots);

        // 사용자에 따른 스타일 결정
        const isCurrentUser = schedule.userId === currentUserId;

        return (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            leftPosition={leftPosition}
            scheduleWidth={scheduleWidth}
            isCurrentUser={isCurrentUser}
          />
        );
      })}

      {/* 예약 시트 */}
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
};

export default ScheduleRow;
