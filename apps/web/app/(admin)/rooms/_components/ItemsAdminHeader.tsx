"use client";

import { Button } from "@ui/index";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";

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
    <div className="mt-80 flex justify-between">
      <h1>회의실 관리</h1>
      <Button variant="Secondary" onClick={openPanel}>
        분류 추가
      </Button>
    </div>
  );
}
