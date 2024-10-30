import "@repo/ui/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "좌석 | Codeit Resources",
  description: "좌석 예약을 위한 페이지입니다.",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <div className="md:ml-200">
      <Header page="seats" />
      <div className="bg-custom-black/5 md:px-118 md:py-83 h-screen overflow-auto px-16 py-28">{children}</div>
    </div>
  );
}
