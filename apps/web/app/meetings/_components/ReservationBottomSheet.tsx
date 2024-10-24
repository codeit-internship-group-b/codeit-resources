/* eslint-disable */
"use client";

import React, { useState } from "react";
import { Schedule } from "@/app/types/scheduletypes";

import { Sheet } from "react-modal-sheet";

interface ReservationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialTime: string;
  schedules: Schedule[];
  onAddSchedule: (newSchedule: Schedule) => void;
  currentUserId: string;
  onTimeRangeChange?: (startTime: string, endTime: string) => void; // 추가된 props
}

export const ReservationBottomSheet: React.FC<ReservationBottomSheetProps> = ({
  isOpen,
  onClose,
  initialTime,
  schedules,
  onAddSchedule,
  currentUserId,
  onTimeRangeChange,
}) => {
  const [startTime, setStartTime] = useState<string>(initialTime);
  const [endTime, setEndTime] = useState<string>(initialTime);
  const [title, setTitle] = useState<string>("");

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
  });

  const timeStringToMinutes = (time: string): number => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr as string, 10);
    const minute = parseInt(minuteStr as string, 10);
    return hour * 60 + minute;
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    if (onTimeRangeChange) {
      onTimeRangeChange(newStartTime, endTime);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    if (onTimeRangeChange) {
      onTimeRangeChange(startTime, newEndTime);
    }
  };

  const handleSubmit = () => {
    // 선택한 시간들을 분 단위로 변환합니다.
    const newStartTime = timeStringToMinutes(startTime);
    const newEndTime = timeStringToMinutes(endTime);

    // 시작 시간이 종료 시간보다 이후인 경우 처리
    if (newStartTime >= newEndTime) {
      alert("시작 시간은 종료 시간보다 앞서야 합니다.");
      return;
    }

    // 겹치는 예약 확인 로직
    const overlapping = schedules.some((schedule) => {
      const scheduleStart = timeStringToMinutes(schedule.start_time);
      const scheduleEnd = timeStringToMinutes(schedule.end_time);

      return (
        scheduleStart < newEndTime && scheduleEnd > newStartTime
        // 사용자 ID를 비교하지 않습니다.
      );
    });

    if (overlapping) {
      alert("선택한 시간이 다른 예약과 겹칩니다.");
      return;
    }

    // 새로운 예약 생성
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      date: "", // 필요한 경우 설정
      start_time: startTime,
      end_time: endTime,
      title: title || "새로운 예약",
      userId: currentUserId,
    };

    onAddSchedule(newSchedule);
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <h2 className="text-lg font-bold">예약 생성</h2>
          <div className="mt-4">
            <label className="block">제목</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2" />
          </div>
          <div className="mt-4">
            <label className="block">시작 시간</label>
            <select value={startTime} onChange={handleStartTimeChange} className="w-full border p-2">
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block">종료 시간</label>
            <select value={endTime} onChange={handleEndTimeChange} className="w-full border p-2">
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="mr-2 px-4 py-2">
              취소
            </button>
            <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 text-white">
              예약하기
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
