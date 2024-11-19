// ScheduleSlot.tsx

import { useEffect, useState } from "react";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { useAuthStore } from "@/src/stores/useAuthStore"; // 현재 사용자 정보를 가져오기 위해 추가
import { type IReservation } from "@repo/types";

interface ScheduleSlotProps {
  index: number;
  slotWidth: number;
  slotHeight: number;
  slotCount: number;
  onClick: () => void;
  isReserved: boolean;
  schedule?: IReservation;
}

export default function ScheduleSlot(props: ScheduleSlotProps): JSX.Element {
  const { index, slotHeight, slotWidth, slotCount, onClick, isReserved, schedule } = props;

  const { isSidebarOpen } = useSidebarStore();
  const [isClicked, setIsClicked] = useState(false);

  const user = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기

  const handleClick = (): void => {
    setIsClicked(true);
    onClick();
  };

  // Sidebar가 닫힐 때 클릭 상태 초기화
  useEffect(() => {
    if (!isSidebarOpen) {
      setIsClicked(false);
    }
  }, [isSidebarOpen]);

  // 예약된 슬롯이 현재 사용자의 예약인지 확인
  const isUserReservation = isReserved && schedule && schedule.user._id === user?._id;

  return (
    <div
      className={`hover:bg-gray-60 relative cursor-pointer ${isClicked ? "bg-purple-100" : ""} ${
        isUserReservation ? "hover:bg-purple-100" : ""
      }`}
      style={{ width: slotWidth * slotCount, height: slotHeight }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* 예약된 슬롯의 경우 중간에 가로 막대를 표시 */}
      {isReserved && schedule ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-1/2 h-16 w-full -translate-y-1/2 transform bg-purple-400"></div>
        </div>
      ) : null}

      {/* 좌측 테두리 */}
      {index % 2 === 0 ? (
        <div className="border-gray-10 md:h-110 absolute left-0 top-0 h-full border-l-2" />
      ) : (
        <div className="border-gray-10 absolute bottom-0 left-0 h-24 border-l" />
      )}

      {/* 하단 테두리 */}
      <div className="border-gray-10 absolute bottom-12 left-0 w-full border-b border-dotted" />
    </div>
  );
}
