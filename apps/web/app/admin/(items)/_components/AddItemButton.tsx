"use client";

import { PlusIcon } from "@ui/public";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function AddItemButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = (): void => {
    setIsOpen(true);
  };

  const closeDrawer = (): void => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        className="hover:bg-custom-black/5 flex size-32 cursor-pointer justify-center rounded-full transition-colors duration-300 ease-in-out"
        type="button"
        onClick={openDrawer}
      >
        <PlusIcon width={20} fill="true" />
      </button>

      <Sidebar isOpen={isOpen} onClose={closeDrawer}>
        hi
      </Sidebar>
    </>
  );
}
