import React from "react";

interface ScheduleSlotProps {
  index: number;
  slotWidth: number;
  slotHeight: number;
  isClicked: boolean;
  onClick: (index: number) => void;
}

const ScheduleSlot: React.FC<ScheduleSlotProps> = ({ index, slotWidth, slotHeight, isClicked, onClick }) => {
  return (
    <div
      className={`relative ${isClicked ? "bg-gray-60" : ""}`}
      style={{ width: slotWidth, height: slotHeight }}
      onClick={() => { onClick(index); }}
    >
      {/* 슬롯 배경 */}
      <div className="transition-linear hover:bg-gray-60 h-full w-full cursor-pointer" />
      {/* 30분, 1시간마다 다른 border 표시 */}
      {index % 2 === 0 ? (
        // 매 시간마다 굵은 왼쪽 border
        <div className="border-gray-10 absolute left-0 top-0 h-full border-l-2" />
      ) : (
        // 30분마다 얇은 왼쪽 border
        <div className="border-gray-10 absolute bottom-0 left-0 h-24 border-l" />
      )}
      {/* 하단 border */}
      <div className="border-gray-10 absolute bottom-12 left-0 w-full border-b border-dotted" />
    </div>
  );
};

export default ScheduleSlot;
