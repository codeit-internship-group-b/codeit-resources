/* eslint-disable @tanstack/query/exhaustive-deps */
"use client";

import { createContext, useContext, useState, type ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getUserReservations } from "@/api/reservation";
import { useAuthStore } from "../stores/useAuthStore";

interface SeatContextType {
  checkedSeat: string | null;
  handleSelectSeat: (seatNum: string | null) => void;
  seatReservationId: string | null;
  userReservationData: IReservation[] | undefined;
}

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export function SeatProvider({ children }: { children: ReactNode }): JSX.Element {
  const [checkedSeat, setCheckedSeat] = useState<string | null>(null);
  const { user } = useAuthStore();

  const {
    data: userReservationData,
    isLoading,
    isError,
  } = useQuery<IReservation[]>({
    queryKey: ["user", "reservations", user?._id],
    queryFn: () => {
      if (!user?._id) {
        return Promise.reject(new Error("User ID를 찾을 수 없습니다."));
      }
      return getUserReservations(user._id);
    },
    enabled: Boolean(user?._id),
  });

  const handleSelectSeat = (seatNum: string | null): void => {
    if (seatNum === null) return;
    setCheckedSeat((prev) => (prev === seatNum ? null : seatNum));
  };

  const seatReservationId = useMemo(() => {
    if (isLoading || isError || !userReservationData || !Array.isArray(userReservationData)) return null;
    const seatReservation = userReservationData.find((reservation) => reservation.itemType === "seat");
    return seatReservation?._id ?? null;
  }, [userReservationData, isLoading, isError]);

  return (
    <SeatContext.Provider value={{ checkedSeat, handleSelectSeat, seatReservationId, userReservationData }}>
      {children}
    </SeatContext.Provider>
  );
}

export function useSeatContext(): SeatContextType {
  const context = useContext(SeatContext);
  if (!context) {
    throw new Error("useSeatContext must be used within a SeatProvider");
  }
  return context;
}
