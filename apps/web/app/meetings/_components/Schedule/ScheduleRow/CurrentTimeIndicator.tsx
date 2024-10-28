import React, { useEffect, useState } from "react";

interface CurrentTimeIndicatorProps {
  slotWidth: number;
  startHour: number;
  endHour: number;
}

const CurrentTimeIndicator: React.FC<CurrentTimeIndicatorProps> = ({ slotWidth, startHour, endHour }) => {
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const totalMinutes = (endHour - startHour) * 60;

      if (currentMinutes < startHour * 60 || currentMinutes >= endHour * 60) {
        setCurrentPosition(null);
        setCurrentTime("");
        return;
      }

      const relativeMinutes = currentMinutes - startHour * 60;
      const totalSlots = (endHour - startHour) * 2;
      const scheduleWidth = slotWidth * totalSlots;
      const position = (relativeMinutes / totalMinutes) * scheduleWidth;

      setCurrentPosition(position);

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updatePosition();
    const interval = setInterval(updatePosition, 60000); // 매 분마다 업데이트

    return () => {
      clearInterval(interval);
    };
  }, [slotWidth, startHour, endHour]);

  if (currentPosition === null) {
    return null;
  }

  return (
    <>
      {/* 수직선 */}
      <div
        className="border-custom-black md:top-30 absolute top-0 z-0 h-full border-l-2 md:h-[84%]"
        style={{ left: `${currentPosition}px` }}
      />
      {/* 현재 시간 라벨 */}
      <div
        className="text-xs-semibold text-custom-black absolute -bottom-24 z-0 -ml-16 rounded bg-none md:bottom-0"
        style={{ left: `${currentPosition}px` }}
      >
        {currentTime}
      </div>
    </>
  );
};

export default CurrentTimeIndicator;
