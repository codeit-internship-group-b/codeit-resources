"use client";

import { useSuspenseTeamsQuery } from "../_hooks/useTeams";
import TeamListItem from "./TeamListItem";

export default function TeamList(): JSX.Element {
  const { data: teams } = useSuspenseTeamsQuery();

  return (
    <div className="md:mt-40">
      {teams.map((team) => (
        <TeamListItem key={team.name} team={team} />
      ))}
    </div>
  );
}
