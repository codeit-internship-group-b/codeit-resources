"use client";

import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { debounce } from "es-toolkit";
import { Button, Modal } from "@ui/index";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import ListItem from "@ui/src/components/common/ListItem";
import { type TeamType } from "@repo/types";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Chevron } from "@ui/public";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import ManageTeamModal from "@/app/settings/_components/modals/ManageTeamModal";
import { useDeleteTeam, useUpdateTeamName } from "../_hooks/useTeamsMutations";
import DeleteTeamModalContent from "./DeleteTeamModalContent";

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
    if (isModify) setIsModify(false);
  });

  useEffect(() => {
    if (isModify && inputRef.current) inputRef.current.focus();
  }, [isModify]);

  const { mutate: deleteTeamMutate } = useDeleteTeam();
  const { mutate: updateTeamMutate } = useUpdateTeamName();

  const handleDeleteTeam = (): void => {
    deleteTeamMutate(_id);
  };

  const handleUpdateTeam = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (!changeName) {
        setIsModify(false);
        return;
      }
      updateTeamMutate({ teamId: _id, newName: changeName });
      setIsModify(false);
    }
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
      <div
        className="w-full cursor-default"
        onClick={handleMobileClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleMobileClick();
          }
        }}
      >
        <ListItem isModify={isModify}>
          <span className="flex flex-grow items-center gap-32 text-left">
            {isModify ? (
              <input
                className="placeholder:text-custom-black/50 w-full placeholder:underline placeholder:underline-offset-4 focus:outline-none"
                ref={inputRef}
                placeholder="팀 이름"
                defaultValue={name}
                onChange={handleChange}
                onKeyDown={handleUpdateTeam}
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
            <DeleteTeamModalContent name={name} onConfirm={handleDeleteTeam} />
          </Modal.Root>
        </ListItem>
      </div>

      <ManageTeamModal
        isOpen={isMobileModalOpen}
        onClose={() => {
          setIsMobileModalOpen(false);
        }}
        team={team}
        actions={
          <Modal.Root>
            <Modal.Trigger>
              <Button className="text-md-medium" variant="Secondary" type="button">
                삭제하기
              </Button>
            </Modal.Trigger>
            <DeleteTeamModalContent name={name} onConfirm={handleDeleteTeam} />
          </Modal.Root>
        }
      />
    </>
  );
}
