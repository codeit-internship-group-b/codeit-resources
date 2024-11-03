"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
      <ListItem color="gray" thickness="thick" onClick={toggleListItem}>
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
        <ConfirmationModal Title={title}>
          <CategoryEditDropdown isModifying={isModifying} setIsModifying={setIsModifying} />
        </ConfirmationModal>
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
