"use client";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getDashboard } from "@/api/dashboard";
import DashboardSection from "./DashboardSection";
import DashboardSectionLoading from "./DashboardSectionLoading";

const userId = "6720d4822ba282d39d8a4ea7";

export default function DashboardProvider(): JSX.Element {
  const { data: dashboardData, isLoading: dashboardIsLoading } = useQuery<IReservation[]>({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard({ userId }),
  });

  if (dashboardIsLoading) return <DashboardSectionLoading />;

  return <DashboardSection data={dashboardData} />;
}
