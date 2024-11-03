"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, TriangleIcon } from "@ui/public";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";
import CategoryListSubItem from "./CategoryListSubItem";

interface CategoryListItemProps {
  title: string;
}

export default function CategoryListItem({ title }: CategoryListItemProps): JSX.Element {
  const [isModifying, setIsModifying] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModifying) {
      setIsModifying(false);
    }
  });

  const toggleListItem = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem color="gray" thickness="thick">
        <span className="flex flex-grow items-center gap-32 text-left">
          {isModifying ? (
            <input
              ref={inputRef}
              placeholder="카테고리"
              className="placeholder:text-custom-black/50 bg-gray-60 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // TODO: input 데이터 patch
                  // eslint-disable-next-line no-console
                  console.log(inputValue);
                }
              }}
            />
          ) : (
            title
          )}
        </span>
        <div className="flex gap-12">
          <button
            className="hover:bg-custom-black/5 flex size-32 cursor-pointer justify-center rounded-full transition-colors duration-300 ease-in-out"
            type="button"
          >
            <PlusIcon width={20} fill="true" />
          </button>
          <ConfirmationModal Title={title}>
            <CategoryEditDropdown isModifying={isModifying} setIsModifying={setIsModifying} />
          </ConfirmationModal>
        </div>
        <button
          className="hover:bg-custom-black/5 ml-40 flex size-32 cursor-pointer justify-center rounded-full transition-colors duration-300 ease-in-out"
          type="button"
          onClick={toggleListItem}
        >
          <TriangleIcon
            width={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </ListItem>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="pl-24"
        >
          <CategoryListSubItem title="회의실1" />
        </motion.div>
      ) : null}
    </>
  );
}
