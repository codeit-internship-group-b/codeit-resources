"use client";

import { memo } from "react";

function RoomNameSkeleton(): JSX.Element {
  return (
    <div className="transition-linear md:min-w-128 rounded-8 border-1 text-lg-medium ml-16 inline-block h-48 min-w-80 animate-pulse gap-8 border-gray-200/10 bg-white p-12 text-center md:h-60 md:px-32 md:py-16">
      <div className="rounded-4 h-full w-full bg-gray-400" />
    </div>
  );
}

export default memo(RoomNameSkeleton);
