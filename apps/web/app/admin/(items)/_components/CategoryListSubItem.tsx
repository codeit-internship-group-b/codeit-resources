"use client";

import ListItem from "@ui/src/components/common/ListItem";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";

interface CategoryListSubItemProps {
  title: string;
  editItem: () => void;
}

export default function CategoryListSubItem({ title, editItem }: CategoryListSubItemProps): JSX.Element {
  return (
    <ListItem color="white" thickness="thin">
      <span className="flex flex-grow items-center gap-32 text-left">{title}</span>
      <ConfirmationModal title={title} type="item">
        <CategoryEditDropdown setIsModifying={editItem} />
      </ConfirmationModal>
    </ListItem>
  );
}
