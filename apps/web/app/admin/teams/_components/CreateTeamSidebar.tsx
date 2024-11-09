import { Button, Input } from "@ui/index";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import Sidebar from "@/components/common/Sidebar";
import { useCreateTeam } from "../_hooks/useCreateTeam";
import { useCreateForm } from "../_hooks/useCreateForm";

interface CreateTeamSidebarProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function CreateTeamSidebar({ isOpen, onClick }: CreateTeamSidebarProps): JSX.Element {
  const { handleSubmit, register } = useCreateForm();
  const { mutate: postCreateTeamMutate, isPending } = useCreateTeam();

  const onSubmit: SubmitHandler<FieldValues> = ({ teamName }) => {
    postCreateTeamMutate({ name: teamName as string });
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClick}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={(...rest) => void handleSubmit(onSubmit)(...rest)}
      >
        <div className="gap-76 flex flex-col">
          <h1>팀 추가</h1>
          <Input id="teamName" placeholder="팀 이름" {...register("teamName")} />
        </div>
        <Button className="h-42 w-full" variant="Primary" type="submit" isPending={isPending}>
          추가하기
        </Button>
      </form>
    </Sidebar>
  );
}
