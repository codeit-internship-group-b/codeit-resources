"use client";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import AddCategoryButton from "./AddCategoryButton";
import AddCategoryForm from "./AddCategoryForm";

export default function ItemsAdminHeader(): JSX.Element {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = (): void => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }
  };

  const closePanel = (): void => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1>회의실 관리</h1>
        <AddCategoryButton onClick={openPanel} />
      </div>
      <Sidebar isOpen={isPanelOpen} onClose={closePanel}>
        <AddCategoryForm />
      </Sidebar>
    </>
  );
}
