"use client";

import { BurgerIcon } from "@ui/public";
import Dropdown from "@ui/src/components/common/Dropdown";
import Modal from "@ui/src/components/common/Modal";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import cn from "@ui/src/utils/cn";
import { useRef, useState } from "react";

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
              className="w-full placeholder:text-gray-500 placeholder:underline-offset-1 focus:outline-none"
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
        <Modal.Root>
          <Dropdown
            selectedValue={isModify}
            onSelect={(value: string | boolean) => {
              if (value === "수정") {
                setIsModify((prev) => !prev);
              }
            }}
            size="sm"
          >
            <Dropdown.Toggle iconType="kebab" />
            <Dropdown.Wrapper className="-left-30 top-56">
              <Dropdown.Item hoverStyle="purple" value="수정">
                이름 편집
              </Dropdown.Item>
              <Modal.Trigger>
                <Dropdown.Item hoverStyle="purple" value="삭제">
                  삭제
                </Dropdown.Item>
              </Modal.Trigger>
            </Dropdown.Wrapper>
          </Dropdown>
          <Modal.Content>
            <Modal.Title>땡땡팀을 삭제하시겠습니까?</Modal.Title>
            <Modal.Description>
              삭제 시, 해당 팀은 더 이상 목록에서 보이지 않으며,
              <br className="hidden md:block" /> 해당 계정으로 로그인이 불가합니다.
            </Modal.Description>
            <Modal.Close
              onConfirm={() => {
                // TODO: 삭제 로직 작성
              }}
              confirmText="확인"
              cancelText="취소"
            >
              예
            </Modal.Close>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
}
