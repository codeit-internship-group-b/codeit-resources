"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { type IRoom } from "@repo/types";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";

interface CategoryListSubItemProps {
  item: IRoom;
}

export default function CategoryListSubItem({ item }: CategoryListSubItemProps): JSX.Element {
  const { isSidebarOpen, openSidebar } = useSidebarStore();
  const { setPanelState, setCurrentItem } = useMeetingsStore();

  const openPanelToEditItem = (selectedItem: IRoom): void => {
    if (!isSidebarOpen) {
      setPanelState("edit");
      setCurrentItem(selectedItem);
      openSidebar();
    }
  };

  return (
    <ListItem color="white" thickness="thin">
      <span className="flex flex-grow items-center gap-32 text-left">{item.name}</span>
      <ConfirmationModal title={item.name} type="item" onConfirm={() => {}}>
        <CategoryEditDropdown
          onClickEdit={() => {
            openPanelToEditItem(item);
          }}
        />
      </ConfirmationModal>
    </ListItem>
  );
}
