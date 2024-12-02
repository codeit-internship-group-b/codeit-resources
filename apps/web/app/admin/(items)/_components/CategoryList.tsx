"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllRooms } from "@/api/meetings";
import useMeetingsStore from "../_store/useMeetingsStore";
import SidePanel from "./SidePanel";
import CategoryListItem from "./CategoryListItem";

export default function CategoryList(): JSX.Element {
  const { categories, setCategories, rooms, setRooms } = useMeetingsStore();

  const { data: fetchedCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const { data: fetchedRooms } = useQuery({ queryKey: ["rooms"], queryFn: getAllRooms });

  useEffect(() => {
    if (fetchedCategories) {
      const roomCategories = fetchedCategories.filter((category) => category.itemType === "room");
      setCategories(roomCategories);
    }
  }, [fetchedCategories, setCategories]);

  useEffect(() => {
    if (fetchedRooms) {
      setRooms(fetchedRooms);
    }
  }, [fetchedRooms, setRooms]);

  const filteredRoomsByCategory = categories.map((category) => ({
    categoryId: category._id,
    rooms: rooms.filter((room) => room.category._id === category._id),
  }));

  return (
    <>
      {categories.map((category) => {
        const filteredRooms = filteredRoomsByCategory.find((item) => item.categoryId === category._id)?.rooms ?? [];
        return <CategoryListItem key={category._id} category={category} rooms={filteredRooms} />;
      })}
      <SidePanel />
    </>
  );
}
