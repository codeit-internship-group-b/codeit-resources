"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { debounce } from "es-toolkit";
import { Modal } from "@ui/index";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import ListItem from "@ui/src/components/common/ListItem";
import { type TeamType } from "@repo/types";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useDeleteTeam } from "../_hooks/useDeleteTeam";
import { useUpdateTeam } from "../_hooks/useUpdateTeam";

interface TeamListItemProps {
  team: TeamType;
}

export default function TeamListItem({ team }: TeamListItemProps): JSX.Element {
  const { name, _id } = team;

  const [isModify, setIsModify] = useState(false);
  const [changeName, setChangeName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (isModify) {
      setIsModify(false);
    }
  });

  useEffect(() => {
    if (isModify && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModify]);

  const { mutate: deleteTeamMutate } = useDeleteTeam();
  const { mutate: updateTeamMutate } = useUpdateTeam();

  const handleDeleteTeam = (): void => {
    deleteTeamMutate(_id);
  };

  const handleUpdateTeam = (): void => {
    if (!changeName) {
      setIsModify(false);
      return;
    }

    updateTeamMutate({ teamId: _id, newName: changeName });
    setIsModify(false);
  };

  const debouncedChangeHandler = debounce((value: string) => {
    setChangeName(value);
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    debouncedChangeHandler(e.target.value);
  };

  return (
    <ListItem isModify={isModify}>
      <span className="flex flex-grow items-center gap-32 text-left">
        {isModify ? (
          <input
            className="placeholder:text-custom-black/50 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
            ref={inputRef}
            placeholder="팀 이름"
            defaultValue={name}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateTeam();
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
