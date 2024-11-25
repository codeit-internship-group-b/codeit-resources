"use client";

import { useCurrentTimePosition } from "@/app/_hooks/useCurrentTimePosition";
import CurrentTimeLabel from "./CurrentTimeLabel";

interface CurrentTimeIndicatorProps {
  slotWidth: number;
  startHour: number;
  endHour: number;
}

export default function CurrentTimeIndicator(props: CurrentTimeIndicatorProps): JSX.Element {
  const { slotWidth, startHour, endHour } = props;
  const { currentPosition, currentTime } = useCurrentTimePosition({
    slotWidth,
    startHour,
    endHour,
  });

  if (currentPosition === null) {
    return <div />;
  }

  return (
    <div className="relative">
      <div
        className="border-custom-black md:top-30 absolute top-0 z-30 h-full border-l-2 md:ml-36"
        style={{ left: `${currentPosition}px` }}
      />
      <CurrentTimeLabel position={currentPosition} time={currentTime} />
    </div>
  );
}
