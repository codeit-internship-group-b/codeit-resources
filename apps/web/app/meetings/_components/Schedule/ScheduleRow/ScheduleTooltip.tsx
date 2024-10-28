"use client";

interface ScheduleTooltipProps {
  title: string;
}

export default function ScheduleTooltip(props: ScheduleTooltipProps): JSX.Element {
  const { title } = props;
  return (
    <div className="absolute bottom-full left-1/2 mb-14 hidden w-max -translate-x-1/2 transform group-hover:block">
      <div className="text-sm-medium bg-gray-90 relative z-10 rounded-lg px-8 py-4 text-sm text-white/90">
        {title}
        <div className="border-t-gray-90 absolute left-20 top-full h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent" />
      </div>
    </div>
  );
}
