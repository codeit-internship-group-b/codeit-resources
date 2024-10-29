"use client";

import { Modal } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import ListItem from "@ui/src/components/common/ListItem";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useRef, useState } from "react";

const MOCK_TITLE = "회의실";

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
            placeholder="카테고리명"
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
      <Modal.Root>
        <Dropdown
          selectedValue={isModify}
          onSelect={(value: string | boolean) => {
            if (value === "수정") {
              setIsModify(true);
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
          <Modal.Title>
            <p className="text-20 mb-10 text-center font-extrabold">{MOCK_TITLE}</p>
            <p>해당 카테고리를 삭제하시겠습니까?</p>
          </Modal.Title>
          <Modal.Description>
            <p>삭제된 카테고리는 복구할 수 없습니다.</p>
            <p>카테고리 하위의 아이템들도 함께 삭제됩니다.</p>
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
    </ListItem>
  );
}
