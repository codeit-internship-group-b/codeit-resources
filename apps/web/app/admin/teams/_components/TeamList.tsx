"use client";

import { BurgerIcon } from "@ui/public";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import cn from "@ui/src/utils/cn";
import { useRef, useState } from "react";
import TeamSettingsDropdown from "./TeamSettingsDropdown";

export default function TeamList(): JSX.Element {
  const [isModify, setIsModify] = useState(false);
  const [changeName, setChangeName] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(divRef, () => {
    if (isModify) {
      setIsModify(false);
    }
  });

  return (
    <div className="mt-40">
      <div
        ref={divRef}
        className={cn(
          "boder-solid rounded-12 flex h-72 items-center justify-between border border-gray-200/10 px-24 py-16",
          { "border-custom-black": isModify },
        )}
      >
        <span className="flex flex-grow items-center gap-32 text-left">
          <BurgerIcon className="cursor-pointer" />
          {isModify ? (
            <input
              placeholder="팀 이름"
              className="placeholder:text-custom-black/50 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
              onChange={(e) => {
                setChangeName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // TODO: 전송 로직을 실행하는 함수
                  // eslint-disable-next-line no-console
                  console.log(changeName);
                }
              }}
            />
          ) : (
            "Management"
          )}
        </span>
        <TeamSettingsDropdown isModify={isModify} setIsModify={setIsModify} />
      </div>
    </div>
  );
}
