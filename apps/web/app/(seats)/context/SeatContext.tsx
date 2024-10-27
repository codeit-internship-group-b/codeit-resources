"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SeatContextType {
  checkedSeat: string | null;
  handleSelectSeat: (seatNum: string) => void;
}

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export function SeatProvider({ children }: { children: ReactNode }): JSX.Element {
  const [checkedSeat, setCheckedSeat] = useState<string | null>(null);

  const handleSelectSeat = (seatNum: string): void => {
    setCheckedSeat((prev) => (prev === seatNum ? null : seatNum));
  };

  return <SeatContext.Provider value={{ checkedSeat, handleSelectSeat }}>{children}</SeatContext.Provider>;
}

export function useSeatContext(): SeatContextType {
  const context = useContext(SeatContext);
  if (!context) {
    throw new Error("useSeatContext must be used within a SeatProvider");
  }
  return context;
}
