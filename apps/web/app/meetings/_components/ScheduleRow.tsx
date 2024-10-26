/* eslint-disable  */
// components/ScheduleRow.tsx

import React from "react";

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

  const currentUserId = "1"; // 현재 로그인한 사용자의 userId

  return (
    <div className="relative" style={{ height: slotHeight }}>
      {/* 빈 슬롯들 */}
      <div className="absolute left-0 top-0 flex">
        {Array.from({ length: totalSlots }).map((_, index) => (
          <div key={index} className="relative" style={{ width: slotWidth, height: slotHeight }}>
            {/* 슬롯 배경 */}
            <div className="hover:bg-gray-60 h-full w-full cursor-pointer"></div>
            {/* 30분, 1시간마다 다른 border 표시 */}
            {index % 2 === 0 ? (
              // 매 시간마다 굵은 왼쪽 border
              <div className="border-gray-10 absolute left-0 top-0 h-full border-l-2"></div>
            ) : (
              // 30분마다 얇은 왼쪽 border
              <div className="border-gray-10 absolute bottom-0 left-0 h-12 border-l"></div>
            )}
            {/* 하단 border */}
            <div className="border-gray-10 absolute bottom-10 left-0 w-full border-b border-dotted"></div>
          </div>
        ))}
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

        // 스케줄 바의 위치와 너비 계산
        const leftPosition = (startMinutes / totalMinutes) * (slotWidth * totalSlots);
        const scheduleWidth = (scheduleDuration / totalMinutes) * (slotWidth * totalSlots);

        // 사용자에 따른 스타일 결정
        const isCurrentUser = schedule.userId === currentUserId;
        const backgroundColor = isCurrentUser ? "bg-purple-400" : "bg-gray-80";
        const hoverColor = isCurrentUser
          ? "hover:bg-purple-200 hover:outline-purple-40 hover:outline"
          : "hover:bg-gray-200/10";

        return (
          <div
            key={schedule.id}
            className={`absolute h-full ${hoverColor}`}
            style={{
              left: `${leftPosition}px`,
              width: `${scheduleWidth}px`,
            }}
          >
            <div
              className={`group absolute relative left-0 top-20 flex h-20 cursor-pointer items-center justify-center ${backgroundColor} text-white`}
              style={{
                width: "100%",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // 스케줄 클릭 이벤트 처리
              }}
            >
              {isCurrentUser ? (
                // 자신의 스케줄인 경우 타이틀 표시
                <span>&nbsp;</span>
              ) : (
                // 다른 사용자의 스케줄인 경우 타이틀 숨기고 툴팁 표시
                <>
                  {/* 빈 내용 */}
                  <span>&nbsp;</span>
                  {/* 툴팁 */}
                  <div className="absolute bottom-full left-1/2 mb-16 hidden w-max -translate-x-1/2 transform group-hover:block">
                    <div className="text-sm-medium bg-gray-90 relative z-10 rounded-lg px-8 py-4 text-sm text-white/90">
                      {schedule.title}
                      <div className="border-t-gray-90 absolute left-20 top-full h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleRow;
