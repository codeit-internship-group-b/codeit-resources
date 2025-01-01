import { useEffect, useState } from "react";

interface UseCurrentTimePositionProps {
  slotWidth: number;
  startHour: number;
  endHour: number;
}

interface UseCurrentTimePositionReturn {
  currentPosition: number | null;
  currentTime: string;
}

export function useCurrentTimePosition({
  slotWidth,
  startHour,
  endHour,
}: UseCurrentTimePositionProps): UseCurrentTimePositionReturn {
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
      const scheduleWidth = slotWidth * (endHour - startHour) * 2; // Assuming 30-minute slots
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

  return { currentPosition, currentTime };
}
