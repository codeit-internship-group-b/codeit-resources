"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { type PropsWithChildren, useRef, useState, useEffect } from "react";
import { TriangleIcon } from "@ui/public";
import { type ICategory, type IRoom } from "@repo/types";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { deleteCategory, patchCategory } from "@/api/meetings";
import { notify } from "@/app/store/useToastStore";
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
  const { setPanelState, setCurrentItem, setCurrentCategory } = useMeetingsStore();
  const [isOpen, setIsOpen] = useState(false);

  const [isModifyingCategoryName, setIsModifyingCategoryName] = useState(false);
  const [inputValue, setInputValue] = useState(category.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

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

  const openPanelToAddItem = (selectedCategory: ICategory): void => {
    if (!isSidebarOpen) {
      setPanelState("add");
      setCurrentItem(null);
      setCurrentCategory(selectedCategory);
      openSidebar();
    }
  };

  const toggleListItem = (): void => {
    setIsOpen(!isOpen);
  };

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      return await deleteCategory(categoryId);
    },
    onSuccess: async () => {
      notify("success", "카테고리가 삭제되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      notify("error", "삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteCategory = (categoryId: string) => {
    deleteMutation.mutate(categoryId);
  };

  const updateMutation = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      return await patchCategory(category._id, payload);
    },
    onSuccess: async () => {
      notify("success", "카테고리가 수정되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      notify("error", "수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleUpdateCategory = (): void => {
    if (!inputValue.trim()) {
      notify("error", "카테고리명을 입력해주세요.");
      return;
    }
    if (inputValue.trim() === category.name) {
      setIsModifyingCategoryName(false);
      return;
    }
    const payload = {
      name: inputValue,
    };

    updateMutation.mutate(payload);
  };

  return (
    <>
      <ListItem color="gray" thickness="thick">
        <span className="flex flex-grow items-center gap-32 text-left">
          {isModifyingCategoryName ? (
            <input
              defaultValue={inputValue}
              ref={inputRef}
              placeholder="카테고리명"
              className="placeholder:text-custom-black/50 bg-gray-60 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdateCategory();
                  setIsModifyingCategoryName(false);
                }
              }}
            />
          ) : (
            inputValue
          )}
        </span>

        <div className="flex gap-12">
          <AddItemButton
            onClick={() => {
              openPanelToAddItem(category);
            }}
          />
          <ConfirmationModal
            title={category.name}
            type="category"
            onConfirm={() => {
              handleDeleteCategory(category._id);
            }}
          >
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
