"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { type IRoom } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { deleteRoom } from "@/api/meetings";
import useMeetingsStore from "../_store/useMeetingsStore";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";

interface CategoryListSubItemProps {
  item: IRoom;
}

export default function CategoryListSubItem({ item }: CategoryListSubItemProps): JSX.Element {
  const { isSidebarOpen, openSidebar } = useSidebarStore();
  const { setPanelState, setCurrentItem, setCurrentCategory } = useMeetingsStore();
  const queryClient = useQueryClient();

  const openPanelToEditItem = (selectedItem: IRoom): void => {
    if (!isSidebarOpen) {
      setPanelState("edit");
      setCurrentItem(selectedItem);
      setCurrentCategory(selectedItem.category);
      openSidebar();
    }
  };

  const mutation = useMutation({
    mutationFn: async (itemId: string) => {
      return await deleteRoom(itemId);
    },
    onSuccess: async () => {
      notify({ type: "success", message: "회의실이 삭제되었습니다." });
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      notify({ type: "error", message: "회의실 삭제에 실패했습니다. 다시 시도해주세요" });
    },
  });

  const handleDeleteRoom = (itemId: string) => {
    mutation.mutate(itemId);
  };
  return (
    <ListItem color="white" thickness="thin">
      <span className="flex flex-grow items-center gap-32 text-left">{item.name}</span>
      <ConfirmationModal
        title={item.name}
        type="item"
        onConfirm={() => {
          handleDeleteRoom(item._id);
        }}
      >
        <CategoryEditDropdown
          onClickEdit={() => {
            openPanelToEditItem(item);
          }}
        />
      </ConfirmationModal>
    </ListItem>
  );
}
