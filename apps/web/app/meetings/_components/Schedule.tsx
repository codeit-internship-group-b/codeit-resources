/* eslint-disable */
import React, { useState } from "react";
import { MeetingBottomSheet } from "./MeetingBottomSheet"; // SnapSheet 컴포넌트 임포트

interface Schedule {
  start: string;
  end: string;
  title: string;
  userId: string;
}

interface RoomScheduleProps {
  roomName: string;
  schedules: Schedule[];
  currentUserId: string; // 현재 사용자의 ID
}

export const RoomSchedule: React.FC<RoomScheduleProps> = ({ roomName, schedules, currentUserId }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null); // 선택한 예약

  // 00:00부터 23:30까지 30분 간격의 슬롯을 생성
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  return (
    <div>
      <div className="mb-2 rounded-lg bg-white p-2 text-center shadow-md">{roomName}</div>

      {/* 시간표 (가로 스크롤 가능) */}
      <div className="ml-50 flex flex-col overflow-x-auto">
        {/* 시간 라벨 및 예약 현황을 함께 표시 */}
        <div className="flex">
          {Array.from({ length: 24 }, (_, i) => {
            const hourLabel = i < 10 ? `0${i}:00` : `${i}:00`; // 시간 라벨 추가
            const firstSlotIndex = i * 2;
            const secondSlotIndex = firstSlotIndex + 1;
            const firstSlot = timeSlots[firstSlotIndex];
            const secondSlot = timeSlots[secondSlotIndex];

            return (
              <div key={i} className="flex flex-col items-center">
                {/* 시간 라벨 */}
                <div className="w-[100px] text-center text-sm font-bold text-gray-700">{hourLabel}</div>

                <div className="flex">
                  {firstSlot && (
                    <div
                      key={firstSlot}
                      className="relative h-12 w-[50px] border border-gray-300"
                      onClick={() => {
                        const schedule = schedules.find(
                          (s) => s.start <= firstSlot && s.end > firstSlot && s.userId === currentUserId,
                        );
                        if (schedule) setSelectedSchedule(schedule);
                      }}
                    >
                      {schedules.map((schedule, index) => {
                        const isScheduled = schedule.start <= firstSlot && schedule.end > firstSlot;
                        const isCurrentUser = schedule.userId === currentUserId; // 현재 사용자가 예약했는지 확인
                        return isScheduled ? (
                          <div
                            key={index}
                            className={`absolute inset-0 ${isCurrentUser ? "bg-purple-700" : "bg-gray-300"}`} // 현재 사용자일 경우 배경색을 purple, 그렇지 않으면 gray
                          />
                        ) : null;
                      })}
                    </div>
                  )}
                  {secondSlot && (
                    <div
                      key={secondSlot}
                      className="relative h-12 w-[50px] border border-gray-300"
                      onClick={() => {
                        const schedule = schedules.find(
                          (s) => s.start <= secondSlot && s.end > secondSlot && s.userId === currentUserId,
                        );
                        if (schedule) setSelectedSchedule(schedule);
                      }}
                    >
                      {schedules.map((schedule, index) => {
                        const isScheduled = schedule.start <= secondSlot && schedule.end > secondSlot;
                        const isCurrentUser = schedule.userId === currentUserId; // 현재 사용자가 예약했는지 확인
                        return isScheduled ? (
                          <div
                            key={index}
                            className={`absolute inset-0 ${isCurrentUser ? "bg-purple-700" : "bg-gray-300"}`} // 현재 사용자일 경우 배경색을 purple, 그렇지 않으면 gray
                          />
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SnapSheet 컴포넌트 */}
      {selectedSchedule && (
        <MeetingBottomSheet
          isOpen={!!selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          schedule={selectedSchedule} // 예약된 스케줄 정보를 전달
        />
      )}
    </div>
  );
};
