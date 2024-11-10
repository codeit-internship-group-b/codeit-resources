import { Input } from "@ui/index";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { type TeamType } from "@repo/types";
import { debounce } from "es-toolkit";
import SettingsModal from "@/components/SettingsModal/SettingsModal";
import { useCreateForm } from "../_hooks/useCreateForm";
import { useCreateTeam } from "../_hooks/useCreateTeam";
import { useUpdateTeam } from "../_hooks/useUpdateTeam";

interface ManageTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCreate?: boolean;
  team?: TeamType;
}

export default function ManageTeamModal({ isCreate, isOpen, onClose, team }: ManageTeamModalProps): JSX.Element {
  const title = isCreate ? "팀 추가" : "팀 수정";
  const buttonText = isCreate ? "추가하기" : "수정하기";

  const { _id = "", name } = team ?? {};

  const { handleSubmit, register, setValue, reset } = useCreateForm();
  const { mutate: postCreateTeamMutate } = useCreateTeam();
  const { mutate: updateTeamMutate } = useUpdateTeam();

  const debouncedSubmit = debounce((teamName: string) => {
    isCreate
      ? postCreateTeamMutate(
          { name: teamName },
          {
            onSuccess: () => {
              onClose();
              reset();
            },
          },
        )
      : updateTeamMutate(
          { teamId: _id, newName: teamName },
          {
            onSuccess: () => {
              onClose();
              reset();
            },
          },
        );
  }, 800);

  const onSubmit: SubmitHandler<FieldValues> = ({ teamName }) => {
    debouncedSubmit(teamName as string);
  };

  useEffect(() => {
    if (name) setValue("teamName", name);
  }, [name, setValue]);

  return (
    <SettingsModal isOpen={isOpen} onClose={onClose}>
      <SettingsModal.Header title={title} />
      <form onSubmit={(...rest) => void handleSubmit(onSubmit)(...rest)}>
        <Input id="teamName" placeholder="팀 이름" {...register("teamName")} />
        <SettingsModal.Button type="submit">{buttonText}</SettingsModal.Button>
      </form>
    </SettingsModal>
  );
}
