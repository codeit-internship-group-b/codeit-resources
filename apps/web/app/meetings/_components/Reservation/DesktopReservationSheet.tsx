/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";

interface DesktopReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule;
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { isOpen, onClose, selectedTime, selectedSchedule } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

  const handleSubmit = (data: ScheduleFormData): void => {
    onClose();
  };

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          onClose();
        }}
      >
        <ReservationForm onSubmit={handleSubmit} selectedTime={selectedTime} selectedSchedule={selectedSchedule} />
      </Sidebar>
    </div>
  );
}
