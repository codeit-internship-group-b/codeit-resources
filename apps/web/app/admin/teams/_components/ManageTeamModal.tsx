import { Input } from "@ui/index";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { type ReactNode, useEffect } from "react";
import { type TeamType } from "@repo/types";
import { debounce } from "es-toolkit";
import { SettingsModal, SettingsModalButton, SettingsModalHeader } from "@/components/SettingsModal";
import { useCreateForm, useCreateTeam, useUpdateTeamName } from "../_hooks/useTeamsMutations";

interface ManageTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCreate?: boolean;
  team?: TeamType;
  actions?: ReactNode;
}

export default function ManageTeamModal({
  isCreate,
  isOpen,
  onClose,
  team,
  actions,
}: ManageTeamModalProps): JSX.Element {
  const title = isCreate ? "팀 추가" : "팀 수정";
  const buttonText = isCreate ? "추가하기" : "수정하기";
  const { _id, name } = team ?? {};

  const { handleSubmit, register, setValue, reset } = useCreateForm();
  const { mutate: postCreateTeamMutate } = useCreateTeam();
  const { mutate: updateTeamMutate } = useUpdateTeamName();

  const debouncedSubmit = debounce((teamName: string) => {
    isCreate ? postCreateTeamMutate({ name: teamName }) : updateTeamMutate({ teamId: _id ?? "", newName: teamName });

    onClose();
    reset();
  }, 800);

  const onSubmit: SubmitHandler<FieldValues> = ({ teamName }) => {
    debouncedSubmit(teamName as string);
  };

  useEffect(() => {
    if (name) setValue("teamName", name);
  }, [name, setValue]);

  return (
    <SettingsModal isOpen={isOpen} onClose={onClose}>
      <SettingsModalHeader title={title} actions={actions} />
      <form onSubmit={(...rest) => void handleSubmit(onSubmit)(...rest)}>
        <Input id="teamName" placeholder="팀 이름" {...register("teamName")} />
        <SettingsModalButton type="submit">{buttonText}</SettingsModalButton>
      </form>
    </SettingsModal>
  );
}
