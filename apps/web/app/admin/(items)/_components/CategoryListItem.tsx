"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";
import CategoryEditDropdown from "./CategoryEditDropdown";
import ConfirmationModal from "./ConfirmationModal";

const MOCK_TITLE = "회의실";

export default function CategoryListItem(): JSX.Element {
  const [isModifying, setIsModifying] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModifying) {
      setIsModifying(false);
    }
  });

  return (
    <ListItem>
      <span className="flex flex-grow items-center gap-32 text-left">
        {isModifying ? (
          <input
            ref={inputRef}
            placeholder="카테고리"
            className="placeholder:text-custom-black/50 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
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
          MOCK_TITLE
        )}
      </span>
      <ConfirmationModal Title={MOCK_TITLE}>
        <CategoryEditDropdown isModifying={isModifying} setIsModifying={setIsModifying} />
      </ConfirmationModal>
    </ListItem>
  );
}
