"use client";

import { useSidebarStore } from "@/app/store/useSidebarStore";
import AddCategoryButton from "./AddCategoryButton";

export default function ItemsAdminHeader(): JSX.Element {
  const { isSidebarOpen, openSidebar } = useSidebarStore();

  const openPanel = (): void => {
    if (!isSidebarOpen) {
      openSidebar();
    }
  };

  return (
    <div className="flex justify-between">
      <h1>회의실 관리</h1>
      <AddCategoryButton onClick={openPanel} />
    </div>
  );
}
