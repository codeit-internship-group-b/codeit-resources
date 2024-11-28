"use client";

import { memo } from "react";

function TimeTextSkeleton(): JSX.Element {
  return (
    <div className="flex w-full">
      {Array.from({ length: 24 }, (_, index) => (
        <div key={`skeleton-${index}`} className="min-w-144 -ml-40 mt-6 flex animate-pulse items-center justify-center">
          <div className="h-12 w-40 rounded bg-gray-400" />
        </div>
      ))}
    </div>
  );
}

export default memo(TimeTextSkeleton);
