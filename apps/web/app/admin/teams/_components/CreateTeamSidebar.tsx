import { Button, Input } from "@ui/index";
import { type ChangeEvent, useState, type FormEvent } from "react";
import { debounce } from "es-toolkit";
import Sidebar from "@/components/common/Sidebar";
import { useCreateTeam } from "../_hooks/useCreateTeam";

interface CreateTeamSidebarProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function CreateTeamSidebar({ isOpen, onClick }: CreateTeamSidebarProps): JSX.Element {
  const [teamName, setTeamName] = useState("");
  const { mutate: postCreateTeamMutate, isPending } = useCreateTeam();

  const debouncedSetTeamName = debounce((value: string) => {
    setTeamName(value);
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    debouncedSetTeamName(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (teamName) postCreateTeamMutate({ name: teamName });
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClick}>
      <form className="flex h-full flex-col justify-between" onSubmit={handleSubmit}>
        <div className="gap-76 flex flex-col">
          <h1>팀 추가</h1>
          <Input id="teamName" placeholder="팀 이름" onChange={handleChange} />
        </div>
        <Button className="h-42 w-full" variant="Primary" type="submit" isPending={isPending}>
          추가하기
        </Button>
      </form>
    </Sidebar>
  );
}
