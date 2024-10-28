"use client";
import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types";
import { getDashboard } from "@/api/dashboard";
import DashboardSection from "./DashboardSection";

const userId = "yaya123";

export default function DashboardProvider(): JSX.Element {
  const { data: dashboardData } = useQuery<IReservation[]>({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard({ userId }),
  });
  return <DashboardSection data={dashboardData} />;
}
