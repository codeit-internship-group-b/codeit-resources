"use client";

import { useRef, useState } from "react";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Modal } from "@ui/index";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import ListItem from "@ui/src/components/common/ListItem";
import { type TeamType } from "@repo/types";
import { useDeleteTeam } from "../_hooks/useDeleteTeam";

interface TeamSettingsDropdownProps {
  team: TeamType;
}

export default function TeamListItem({ team }: TeamSettingsDropdownProps): JSX.Element {
  const { name, _id } = team;

  const [isModify, setIsModify] = useState(false);
  const [changeName, setChangeName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModify) {
      setIsModify(false);
    }
  });

  const { mutate: deleteTeamMutate } = useDeleteTeam();

  const handleDeleteTeam = (): void => {
    deleteTeamMutate(_id);
  };

  return (
    <ListItem isModify={isModify}>
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
          name
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
          <Modal.Title>{name} 팀을 삭제하시겠습니까?</Modal.Title>
          <Modal.Description>
            삭제 시, 해당 팀은 더 이상 목록에서 보이지 않으며,
            <br className="hidden md:block" /> 해당 계정으로 로그인이 불가합니다.
          </Modal.Description>
          <Modal.Close onConfirm={handleDeleteTeam} confirmText="확인" cancelText="취소">
            예
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
    </ListItem>
  );
}
