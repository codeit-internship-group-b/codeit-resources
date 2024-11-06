import { Button, Input, notify } from "@ui/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ChangeEvent, useState, type FormEvent } from "react";
import Sidebar from "@/components/common/Sidebar";
import { useCreateTeam } from "../_hooks/useCreateTeam";

interface AddTeamSideberProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AddTeamSidebar({ isOpen, onClick }: AddTeamSideberProps): JSX.Element {
  const [teamName, setTeamName] = useState("");
  const { mutate: postCreateTeamMutate } = useCreateTeam();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // TODO: debouce 적용
    setTeamName(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (teamName) {
      postCreateTeamMutate(teamName);
    }
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClick}>
      <form className="flex h-full flex-col justify-between" onSubmit={handleSubmit}>
        <div className="gap-76 flex flex-col">
          <h1>팀 추가</h1>
          <Input id="teamName" placeholder="팀 이름" onChange={handleChange} />
        </div>
        <Button className="w-full" variant="Primary" type="submit">
          추가하기
        </Button>
      </form>
    </Sidebar>
  );
}
