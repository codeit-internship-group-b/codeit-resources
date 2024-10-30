"use client";

import { useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import ReservationForm from "./ReservationForm";

interface MobileReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
  selectedRoom: string;
}

export default function MobileReservationSheet(props: MobileReservationSheetProps): JSX.Element {
  const { isOpen, onClose, selectedTime, selectedSchedule, selectedRoom } = props;

  const { closeSidebar } = useSidebarStore();

  const handleSubmit = (data: ScheduleFormData): void => {
    // 예약 로직 처리
    console.log("예약 데이터:", { ...data, selectedRoom });
    closeSidebar();
    onClose();
  };

  return (
    <div className="block md:hidden">
      <Sidebar
        isOpen={isOpen}
        onClose={() => {
          closeSidebar();
          onClose();
        }}
      >
        <ReservationForm
          onSubmit={handleSubmit}
          selectedTime={selectedTime}
          selectedSchedule={selectedSchedule}
          selectedRoom={selectedRoom} // 미팅룸 전달
        />
      </Sidebar>
    </div>
  );
}
