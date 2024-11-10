"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { debounce } from "es-toolkit";
import { Modal } from "@ui/index";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import ListItem from "@ui/src/components/common/ListItem";
import { type TeamType } from "@repo/types";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Chevron } from "@ui/public";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import { useDeleteTeam } from "../_hooks/useDeleteTeam";
import { useUpdateTeam } from "../_hooks/useUpdateTeam";
import ManageTeamModal from "./ManageTeamModal";

interface TeamListItemProps {
  team: TeamType;
}

export default function TeamListItem({ team }: TeamListItemProps): JSX.Element {
  const { name, _id } = team;

  const [isModify, setIsModify] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobileStore();

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

  const handleMobileClick = (): void => {
    if (!isMobile) return;

    setIsMobileModalOpen(true);
  };

  return (
    <>
      <button className="w-full" type="button" onClick={handleMobileClick}>
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

          <Chevron className="fill-custom-black rotate-180 md:hidden" />

          <Modal.Root>
            <div className="hidden md:block">
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
            </div>

            <Modal.Content>
              <Modal.Title>팀 &#39;{name}&#39;를 삭제하시겠어요?</Modal.Title>
              <Modal.Description>
                <p>해당 팀에 대한 정보가 모두 사라집니다.</p>
                <p>단, 해당 팀에 속한 멤버는 삭제되지 않습니다.</p>
              </Modal.Description>
              <Modal.Close onConfirm={handleDeleteTeam} confirmText="삭제하기" cancelText="취소하기">
                예
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
        </ListItem>
      </button>

      <ManageTeamModal
        isOpen={isMobileModalOpen}
        onClose={() => {
          setIsMobileModalOpen(false);
        }}
        team={team}
      />
    </>
  );
}
