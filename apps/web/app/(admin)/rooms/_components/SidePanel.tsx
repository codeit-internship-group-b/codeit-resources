"use client";

import { ErrorBoundary } from "react-error-boundary";
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
      <ErrorBoundary fallback={<div>오류가 발생했습니다.</div>}>
        {(panelState === "add" || panelState === "edit") && <EditItemForm />}
        {panelState === "category" && <AddCategoryForm />}
      </ErrorBoundary>
    </Sidebar>
  );
}
