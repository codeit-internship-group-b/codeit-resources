"use client";

import { PlusIcon } from "@ui/public";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import AddItemForm from "./AddItemForm";

export default function AddItemButton(): JSX.Element {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const openPanel = (): void => {
    setIsPanelOpen(true);
  };

  const closePanel = (): void => {
    setIsPanelOpen(false);
  };
  return (
    <>
      <button
        className="hover:bg-custom-black/5 flex size-32 cursor-pointer justify-center rounded-full transition-colors duration-300 ease-in-out"
        type="button"
        onClick={openPanel}
      >
        <PlusIcon width={20} fill="true" />
      </button>

      <Sidebar isOpen={isPanelOpen} onClose={closePanel}>
        <h1 className="my-24">회의실 추가</h1>
        <AddItemForm />
      </Sidebar>
    </>
  );
}
