/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import ReservationForm from "./ReservationForm";
import ReservationModal from "./ReservationModal";

interface DesktopReservationSheetProps {
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
  selectedRoom: string;
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule, selectedRoom } = props;

  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: ScheduleFormData): void => {
    setIsModalOpen(true);
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
          selectedRoom={selectedRoom}
        />
      </Sidebar>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          onClose();
        }}
      />
    </div>
  );
}
