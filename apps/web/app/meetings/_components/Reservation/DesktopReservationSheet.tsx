"use client";

import { useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import ReservationForm from "./ReservationForm";

interface DesktopReservationSheetProps {
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
  selectedRoom: string; // 새로운 prop 추가
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule, selectedRoom } = props;

  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  const handleSubmit = (data: ScheduleFormData): void => {
    // 예약 로직 처리
    console.log("예약 데이터:", { ...data, selectedRoom });
    closeSidebar();
    onClose();
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      closeSidebar();
    }
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="hidden md:block">
      <Sidebar
        isOpen={isSidebarOpen}
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
