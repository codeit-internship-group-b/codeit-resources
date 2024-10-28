"use client";

import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";

const MOCK_TITLE = "카테고리 제목";

export default function CategoryListItem(): JSX.Element {
  const [isModify, setIsModify] = useState(false);
  const [changeName, setChangeName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModify) {
      setIsModify(false);
    }
  });
  return (
    <ListItem>
      <span className="flex flex-grow items-center gap-32 text-left">
        {isModify ? (
          <input
            ref={inputRef}
            placeholder="팀 이름"
            className="placeholder:text-custom-black/50 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
            onChange={(e) => {
              setChangeName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // TODO: input 데이터 patch
                // eslint-disable-next-line no-console
                console.log(changeName);
              }
            }}
          />
        ) : (
          MOCK_TITLE
        )}
      </span>
    </ListItem>
  );
}
