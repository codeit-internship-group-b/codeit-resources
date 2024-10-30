"use client";

import { useEffect, useState } from "react";

interface CurrentTimeIndicatorProps {
  slotWidth: number;
  startHour: number;
  endHour: number;
}

export default function CurrentTimeIndicator(props: CurrentTimeIndicatorProps): JSX.Element {
  const { slotWidth, startHour, endHour } = props;
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updatePosition = (): void => {
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
    const interval = setInterval(updatePosition, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [slotWidth, startHour, endHour]);

  if (currentPosition === null) {
    return <div />;
  }

  return (
    <div>
      <div
        className="border-custom-black md:top-30 absolute top-0 z-30 h-full border-l-2 md:ml-36"
        style={{ left: `${String(currentPosition)}px` }}
      />

      <div
        className="text-xs-semibold text-custom-black absolute -bottom-24 z-30 -ml-16 rounded bg-none md:-bottom-20 md:block"
        style={{ left: `${String(currentPosition)}px` }}
      >
        {currentTime}
      </div>
    </div>
  );
}
