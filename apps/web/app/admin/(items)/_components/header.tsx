"use client";

import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import AddCategoryButton from "./AddCategoryButton";

export default function ItemsAdminHeader(): JSX.Element {
  const { isSidebarOpen, openSidebar } = useSidebarStore();
  const { setPanelState } = useMeetingsStore();

  const openPanel = (): void => {
    if (!isSidebarOpen) {
      setPanelState("category");
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
