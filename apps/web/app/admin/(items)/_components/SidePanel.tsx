"use client";

import Sidebar from "@/components/common/Sidebar";
import { useSidebarStore } from "@/app/store/useSidebarStore";

export default function SidePanel(): JSX.Element {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  return (
    <Sidebar
      isOpen={isSidebarOpen}
      onClose={() => {
        closeSidebar();
      }}
    >
      side panel
    </Sidebar>
  );
}
