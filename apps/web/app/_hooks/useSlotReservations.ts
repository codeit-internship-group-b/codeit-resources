/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMemo } from "react";
import { type IReservation } from "@repo/types";
import { timeToMinutes } from "../utils/timeToMinutes";

/**
 * 예약 데이터를 슬롯 인덱스에 매핑하는 커스텀 훅
 * @param schedules 예약 데이터 배열
 * @param startHour 시작 시간
 * @param endHour 종료 시간
 * @param minutesPerSlot 슬롯당 분 단위
 * @returns 슬롯별 예약 상태 배열
 */
export const useSlotReservations = (
  schedules: IReservation[],
  startHour: number,
  endHour: number,
  minutesPerSlot: number,
): (IReservation | null)[] => {
  return useMemo(() => {
    const totalSlots = (endHour - startHour) * 2; // 30분 단위
    const slotReservations: (IReservation | null)[] = Array(totalSlots).fill(null);

    schedules.forEach((schedule) => {
      const startMinutes = timeToMinutes(schedule.startAt) - startHour * 60;
      const endMinutes = timeToMinutes(schedule.endAt) - startHour * 60;

      const startIndex = Math.floor(startMinutes / minutesPerSlot);
      const endIndex = Math.ceil(endMinutes / minutesPerSlot);

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= 0 && i < totalSlots) {
          slotReservations[i] = schedule;
        }
      }
    });

    return slotReservations;
  }, [schedules, startHour, endHour, minutesPerSlot]);
};
