import React from "react";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";

interface TriggerProps {
  children: React.ReactNode;
}

export function Trigger({ children }: TriggerProps) {
  const { setIsOpen } = useBottomSheet();

  return (
    <div
      onClick={() => {
        setIsOpen(true);
      }}
    >
      {children}
    </div>
  );
}
