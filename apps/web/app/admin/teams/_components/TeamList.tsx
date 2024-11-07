"use client";

import { useTeams } from "../_hooks/useTeams";
import TeamListItem from "./TeamListItem";

export default function TeamList(): JSX.Element {
  const { data: teams } = useTeams();

  return (
    <div className="mt-40">
      {teams.map((team) => (
        <TeamListItem key={team.name} team={team} />
      ))}
    </div>
  );
}
