"use client";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getDashboard } from "@/api/dashboard";
import DashboardSection from "./DashboardSection";
import DashboardSectionLoading from "./DashboardSectionLoading";

const userId = "671f4d6e0d69d0c517181aa1";

export default function DashboardProvider(): JSX.Element {
  const { data: dashboardData, isLoading: dashboardIsLoading } = useQuery<IReservation[]>({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard({ userId }),
  });

  if (dashboardIsLoading) return <DashboardSectionLoading />;

  return <DashboardSection data={dashboardData} />;
}
