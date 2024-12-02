"use client";

import Sidebar from "@/components/common/Sidebar";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import EditItemForm from "./EditItemForm";
import AddCategoryForm from "./AddCategoryForm";

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
      {panelState === "add" && <EditItemForm />}
      {panelState === "edit" && <EditItemForm />}
      {panelState === "category" && <AddCategoryForm />}
    </Sidebar>
  );
}
