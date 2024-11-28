"use client";

import { useSuspenseTeamsQuery } from "../_hooks/useTeamsQueries";
import { useDragAndDrop } from "../../_hooks/useDragAndDrop";
import EmptyState from "../../members/_components/EmptyState";
import { useUpdateTeamOrder } from "../_hooks/useTeamsMutations";
import TeamListItem from "./TeamListItem";

export default function TeamList(): JSX.Element {
  const { data: teams } = useSuspenseTeamsQuery();
  const {
    handleDragEnd,
    handleDragEnter,
    handleDragOver,
    handleDragStart,
    items: updatedTeams,
  } = useDragAndDrop({
    initialItems: teams,
    onUpdate: (items) => {
      updateTeamOrderMutate(items);
    },
  });
  const { mutate: updateTeamOrderMutate } = useUpdateTeamOrder(updatedTeams);

  // TODO : api swagger 작성
  // TODO : querykey 추가

  if (teams.length === 0) return <EmptyState activeTab="teams" />;

  return (
    <div className="flex flex-col md:mt-40">
      {teams.map((team, index) => (
        <div
          key={team._id}
          onDragStart={(e) => {
            handleDragStart(e, index);
          }}
          onDragEnter={(e) => {
            handleDragEnter(e, index);
          }}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <TeamListItem key={team.name} team={team} />
        </div>
      ))}
    </div>
  );
}
