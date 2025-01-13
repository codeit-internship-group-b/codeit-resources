"use client";

import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getUserReservations } from "@/api/reservation";
import { useAuthStore } from "@/app/store/useAuthStore";
import DashboardSection from "./DashboardSection";
import DashboardSectionLoading from "./DashboardSectionLoading";

export default function DashboardProvider(): JSX.Element {
  const { user } = useAuthStore();

  const { data: userReservationData, isLoading: reservedDataIsLoading } = useQuery<IReservation[]>({
    queryKey: ["user", user?._id],
    queryFn: () => {
      if (!user?._id) {
        return Promise.reject(new Error("User ID를 찾을 수 없습니다."));
      }
      return getUserReservations(user._id);
    },
    enabled: Boolean(user?._id),
  });

  if (reservedDataIsLoading) {
    return <DashboardSectionLoading />;
  }

  return <DashboardSection data={userReservationData} />;
}
