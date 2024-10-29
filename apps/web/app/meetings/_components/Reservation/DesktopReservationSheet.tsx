// DesktopReservationSheet.tsx
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
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule } = props;

  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  const handleSubmit = (data: ScheduleFormData): void => {
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
        isOpen={isSidebarOpen} // 전역 상태 사용
        onClose={() => {
          closeSidebar();
          onClose();
        }}
      >
        <ReservationForm onSubmit={handleSubmit} selectedTime={selectedTime} selectedSchedule={selectedSchedule} />
      </Sidebar>
    </div>
  );
}
