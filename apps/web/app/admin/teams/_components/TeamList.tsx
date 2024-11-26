"use client";

import { type DragEvent, useRef, useState } from "react";
import { useSuspenseTeamsQuery } from "../_hooks/useTeamsQueries";
import TeamListItem from "./TeamListItem";

export default function TeamList(): JSX.Element {
  const { data: teams } = useSuspenseTeamsQuery();

  const [items, setItems] = useState(teams);

  const draggingItemIndex = useRef<number | null>(null);
  const draggingOverItemIndex = useRef<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    draggingItemIndex.current = index;
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
    draggingOverItemIndex.current = index;

    if (draggingItemIndex.current != null && draggingOverItemIndex.current != null) {
      const prevItems = [...items];
      const dragItem = prevItems[draggingItemIndex.current];

      if (dragItem) {
        prevItems.splice(draggingItemIndex.current, 1);
        prevItems.splice(draggingOverItemIndex.current, 0, dragItem);
        draggingItemIndex.current = draggingOverItemIndex.current;
        draggingOverItemIndex.current = null;
        setItems(prevItems);
      }
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-16 md:mt-40">
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
