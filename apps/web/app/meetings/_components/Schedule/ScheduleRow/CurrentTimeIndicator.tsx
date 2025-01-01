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
        className="border-custom-black md:h-120 absolute z-50 ml-36 h-80 border-l-2 border-solid"
        style={{ left: `${currentPosition}px` }}
      />
      <div className="absolute left-36 top-80 block md:hidden">
        <CurrentTimeLabel position={currentPosition} time={currentTime} />
      </div>
    </div>
  );
}
