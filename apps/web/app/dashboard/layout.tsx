import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "대시보드 | Codeit Resources",
  description: "나의 회의 일정을 알 수 있는 페이지입니다.",
};

export default function DashboardLayout({ children }: PropsWithChildren): JSX.Element {
  return <div className="md:ml-200">{children}</div>;
}
