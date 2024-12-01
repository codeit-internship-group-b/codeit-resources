"use client";

import Sidebar from "@/components/common/Sidebar";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import EditItemForm from "./EditItemForm";
import AddCategoryForm from "./AddCategoryForm";

const panelContents: Record<string, JSX.Element | null> = {
  add: <EditItemForm />,
  edit: <EditItemForm />,
  category: <AddCategoryForm />,
};

export default function SidePanel(): JSX.Element {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const { panelState } = useMeetingsStore();

  return (
    <Sidebar
      isOpen={isSidebarOpen}
      onClose={() => {
        closeSidebar();
      }}
    >
      {panelContents[panelState] ?? null}
    </Sidebar>
  );
}
