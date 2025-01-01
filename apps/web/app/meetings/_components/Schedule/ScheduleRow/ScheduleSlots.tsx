import React from "react";
import { type IReservation } from "@repo/types";
import ScheduleSlot from "./ScheduleSlot";

interface ScheduleSlotsProps {
  slotReservations: (IReservation | null)[];
  slotWidth: number;
  slotHeight: number;
  onSlotClick: (index: number, schedule?: IReservation) => void;
}

export default function ScheduleSlots(props: ScheduleSlotsProps): JSX.Element {
  const { slotReservations, slotWidth, slotHeight, onSlotClick } = props;
  const slots: JSX.Element[] = [];
  const totalSlots = slotReservations.length;

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
            onClick={() => {
              onSlotClick(start, schedule);
            }}
            isReserved
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
          onClick={() => {
            onSlotClick(i);
          }}
          isReserved={false}
        />,
      );
    }
  }

  return <>{slots}</>;
}
