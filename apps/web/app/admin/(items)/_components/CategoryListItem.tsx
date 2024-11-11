"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TriangleIcon } from "@ui/public";
import { type IEquipment, type IRoom } from "@repo/types";
import Sidebar from "@/components/common/Sidebar";
import { patchItem, postNewItem } from "@/api/meetings";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";
import CategoryListSubItem from "./CategoryListSubItem";
import AddItemButton from "./AddItemButton";
import EditItemForm from "./AddItemForm";

interface CategoryListItemProps {
  title: string;
}

export default function CategoryListItem({ title }: CategoryListItemProps): JSX.Element {
  const [isModifyingCategoryName, setIsModifyingCategoryName] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [panelState, setPanelState] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModifyingCategoryName) {
      setIsModifyingCategoryName(false);
    }
  });

  const openPanelToAdd = (): void => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);
      setPanelState("add");
    }
  };

  const openPanelToEdit = (): void => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);
      setPanelState("edit");
    }
  };

  const closePanel = (): void => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
    }
  };

  const toggleListItem = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSubmitForm = async (data: FormData, itemId?: string): Promise<IRoom | IEquipment> => {
    if (panelState === "add") {
      const res = await postNewItem("room", data);
      return res;
    } else if (panelState === "edit" && itemId) {
      const res = await patchItem(itemId, data);
      return res;
    }
    throw new Error("잘못된 입력입니다. 새로고침 후 다시 시도해주세요");
  };

  return (
    <>
      <ListItem color="gray" thickness="thick">
        <span className="flex flex-grow items-center gap-32 text-left">
          {isModifyingCategoryName ? (
            <input
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
            title
          )}
        </span>
        <div className="flex gap-12">
          <AddItemButton onClick={openPanelToAdd} />
          <ConfirmationModal title={title} type="category">
            <CategoryEditDropdown isModifying={isModifyingCategoryName} setIsModifying={setIsModifyingCategoryName} />
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
          <CategoryListSubItem title="회의실1" editItem={openPanelToEdit} />
        </motion.div>
      ) : null}
      <Sidebar isOpen={isPanelOpen} onClose={closePanel}>
        <h1 className="my-24">회의실 {panelState === "add" ? "추가" : "수정"}</h1>
        <EditItemForm prevCategory={title} onSubmit={handleSubmitForm} />
      </Sidebar>
    </>
  );
}
