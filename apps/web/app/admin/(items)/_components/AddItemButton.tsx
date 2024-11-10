"use client";

import { PlusIcon } from "@ui/public";

interface AddItemButtonProps {
  onClick: () => void;
}

export default function AddItemButton({ onClick }: AddItemButtonProps): JSX.Element {
  return (
    <button
      className="hover:bg-custom-black/5 flex size-32 cursor-pointer justify-center rounded-full transition-colors duration-300 ease-in-out"
      type="button"
      onClick={onClick}
    >
      <PlusIcon width={20} fill="true" />
    </button>
  );
}
