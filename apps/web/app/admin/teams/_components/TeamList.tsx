"use client";

import { useSuspenseTeamsQuery } from "../_hooks/useTeamsQueries";
import { useDragAndDrop } from "../../_hooks/useDragAndDrop";
import TeamListItem from "./TeamListItem";
// import { useMutation } from "@tanstack/react-query";

export default function TeamList(): JSX.Element {
  const { data: teams } = useSuspenseTeamsQuery();
  const { handleDragEnd, handleDragEnter, handleDragOver, handleDragStart, items } = useDragAndDrop({
    initialItems: teams,
    onUpdate: (updatedItems) => {
      console.log(updatedItems);
    },
  });

  // const {} = useMutation()

  // TODO : api 연동
  // TODO : 드래그앤드랍 TeamListItem 연동

  return (
    <div className="flex flex-col md:mt-40">
      {items.map((team, index) => (
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
