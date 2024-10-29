// ScheduleSlot.tsx
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { useEffect, useState } from "react";

interface ScheduleSlotProps {
  index: number;
  slotWidth: number;
  slotHeight: number;
  onClick: (index: number) => void;
}

export default function ScheduleSlot(props: ScheduleSlotProps): JSX.Element {
  const { index, slotHeight, slotWidth, onClick } = props;

  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarStore();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    openSidebar();
    onClick(index);
  };

  // Sidebar가 닫힐 때 클릭 상태 초기화
  useEffect(() => {
    if (!isSidebarOpen) {
      setIsClicked(false);
    }
  }, [isSidebarOpen]);

  return (
    <div
      className={`relative ${isClicked ? "bg-gray-60" : ""}`}
      style={{ width: slotWidth, height: slotHeight }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="transition-linear hover:bg-gray-60 h-full w-full cursor-pointer" />
      {index % 2 === 0 ? (
        <div className="border-gray-10 absolute left-0 top-0 h-full border-l-2" />
      ) : (
        <div className="border-gray-10 absolute bottom-0 left-0 h-24 border-l" />
      )}
      <div className="border-gray-10 absolute bottom-12 left-0 w-full border-b border-dotted" />
    </div>
  );
}
