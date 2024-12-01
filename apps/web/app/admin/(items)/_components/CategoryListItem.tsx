"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { type PropsWithChildren, useRef, useState, useEffect } from "react";
import { TriangleIcon } from "@ui/public";
import { type ICategory, type IRoom } from "@repo/types";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import AddItemButton from "./AddItemButton";
import CategoryListSubItem from "./CategoryListSubItem";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";

interface CategoryListItemProps extends PropsWithChildren {
  category: ICategory;
  rooms: IRoom[];
}

export default function CategoryListItem({ category, rooms }: CategoryListItemProps): JSX.Element {
  const { isSidebarOpen, openSidebar } = useSidebarStore();
  const { setPanelState } = useMeetingsStore();
  const [isOpen, setIsOpen] = useState(false);

  const [isModifyingCategoryName, setIsModifyingCategoryName] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModifyingCategoryName) {
      setIsModifyingCategoryName(false);
    }
  });

  useEffect(() => {
    if (isModifyingCategoryName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModifyingCategoryName]);

  const openPanelToAddItem = (): void => {
    if (!isSidebarOpen) {
      setPanelState("add");
      openSidebar();
    }
  };

  const toggleListItem = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem color="gray" thickness="thick">
        <span className="flex flex-grow items-center gap-32 text-left">
          {isModifyingCategoryName ? (
            <input
              defaultValue={category.name}
              ref={inputRef}
              placeholder="카테고리명"
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
            category.name
          )}
        </span>

        <div className="flex gap-12">
          <AddItemButton
            onClick={() => {
              openPanelToAddItem();
            }}
          />
          <ConfirmationModal title={category.name} type="category" onConfirm={() => {}}>
            <CategoryEditDropdown
              onClickEdit={() => {
                setIsModifyingCategoryName(true);
              }}
            />
          </ConfirmationModal>
        </div>

        <button
          className="hover:bg-custom-black/5 ml-40 flex size-32 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ease-in-out"
          type="button"
          onClick={toggleListItem}
        >
          <TriangleIcon className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
      </ListItem>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: rooms.length * 75 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pl-24"
        >
          {rooms.map((item) => (
            <CategoryListSubItem key={item._id} item={item} />
          ))}
        </motion.div>
      ) : null}
    </>
  );
}
