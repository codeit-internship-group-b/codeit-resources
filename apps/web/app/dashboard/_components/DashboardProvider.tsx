/* eslint-disable @tanstack/query/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { getUserReservations } from "@/api/reservation";
import { useAuthStore } from "@/src/stores/useAuthStore";
import DashboardSection from "./DashboardSection";
import DashboardSectionLoading from "./DashboardSectionLoading";

export default function DashboardProvider(): JSX.Element {
  const { user } = useAuthStore();
  const router = useRouter();

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

  useEffect(() => {
    if (!user?._id) {
      router.push(PAGE_NAME.SIGN_IN);
    }
  }, [user?._id, router]);

  if (!user?._id) {
    return (
      <div className="p-4 text-center">
        <p>로그인 페이지로 리다이렉트 중입니다...</p>
      </div>
    );
  }

  if (reservedDataIsLoading) {
    return <DashboardSectionLoading />;
  }

  return <DashboardSection data={userReservationData} />;
}
