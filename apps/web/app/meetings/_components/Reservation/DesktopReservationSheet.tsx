// components/common/DesktopReservationSheet.tsx

"use client";

import React, { useEffect, useState } from "react";
import { ReservationForm } from "./ReservationForm";
import Sidebar from "@/components/common/Sidebar";

interface DesktopReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
}

export const DesktopReservationSheet: React.FC<DesktopReservationSheetProps> = ({ isOpen, onClose, selectedTime }) => {
  const handleSubmit = (data: any) => {
    console.log("Reservation Data:", data);
    onClose();
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

  // Sidebar가 열릴 때 외부에서 제어할 수 있도록 useEffect 사용
  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          onClose(); // 외부 onClose도 호출
        }}
      >
        <ReservationForm onSubmit={handleSubmit} selectedTime={selectedTime} />
      </Sidebar>
    </div>
  );
};
