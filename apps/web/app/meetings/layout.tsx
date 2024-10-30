import "@repo/ui/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "회의 | Codeit Resources",
  description: "회의 일정 및 관리를 위한 페이지입니다.",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <div className="md:ml-200 mb-70">
      <Header page="meetings" />
      {children}
    </div>
  );
}
