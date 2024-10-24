"use client";
interface TimeHeaderProps {
  hour: number;
}

export const TimeHeader: React.FC<TimeHeaderProps> = ({ hour }) => {
  const hourLabel = hour < 10 ? `0${hour}:00` : `${hour}:00`;

  return <div className="-ml-100 text-custom-black/50 text-xs-semibold w-[100px] text-center">{hourLabel}</div>;
};
