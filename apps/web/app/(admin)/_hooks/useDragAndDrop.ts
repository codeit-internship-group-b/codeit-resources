import { type DragEvent, useEffect, useRef, useState } from "react";

interface UseDragAndDropParams<T> {
  initialItems: T[];
  onUpdate: (updatedItem: T[]) => void;
}

interface UseDragAndDropResult<T> {
  items: T[];
  handleDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnter: (e: DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
}

export const useDragAndDrop = <T>({ initialItems, onUpdate }: UseDragAndDropParams<T>): UseDragAndDropResult<T> => {
  const [items, setItems] = useState(initialItems);
  const draggingItemIndex = useRef<number>(-1);
  const draggingOverItemIndex = useRef<number>(-1);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number): void => {
    draggingItemIndex.current = index;
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, index: number): void => {
    draggingOverItemIndex.current = index;
    const prevItems = [...items];
    const dragItem = prevItems[draggingItemIndex.current];

    if (dragItem) {
      prevItems.splice(draggingItemIndex.current, 1);
      prevItems.splice(draggingOverItemIndex.current, 0, dragItem);
      draggingItemIndex.current = draggingOverItemIndex.current;
      draggingOverItemIndex.current = -1;
      setItems(prevItems);
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("dragging");
    onUpdate(items);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return { handleDragEnd, handleDragEnter, handleDragOver, handleDragStart, items };
};
