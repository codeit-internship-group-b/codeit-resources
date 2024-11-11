/* eslint-disable @tanstack/query/exhaustive-deps */
"use client";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getUserReservations } from "@/api/reservation";
import { useAuthStore } from "@/src/stores/useAuthStore";
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

  if (!user?._id) {
    return (
      <div className="p-4 text-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  if (reservedDataIsLoading) return <DashboardSectionLoading />;

  return <DashboardSection data={userReservationData} />;
}
