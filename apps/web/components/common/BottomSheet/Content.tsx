import React, { useState } from "react";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";

interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  const { height, setHeight } = useBottomSheet();
  const [startY, setStartY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !e.touches[0]) return;

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    const newHeight = Math.min(100, Math.max(0, height + (diff / window.innerHeight) * 100));

    setHeight(newHeight);
    setStartY(currentY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (height > 75) {
      setHeight(100);
    } else if (height < 25) {
      setHeight(50);
    } else {
      setHeight(50);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 rounded-t-3xl bg-white shadow-lg transition-transform duration-300 ease-out ${
        isDragging ? "transition-none" : ""
      }`}
      style={{ height: `${height}vh` }}
    >
      <div
        className="flex h-12 w-full cursor-grab items-center justify-center active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-1 w-16 rounded-full bg-gray-300" />
      </div>
      <div className="overflow-y-auto p-4">{children}</div>
    </div>
  );
}
