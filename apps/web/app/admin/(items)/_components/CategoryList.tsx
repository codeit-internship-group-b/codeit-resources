"use client";

import { useEffect } from "react";
import { getAllCategories, getAllRooms } from "@/api/meetings";
import useMeetingsStore from "../_store/useMeetingsStore";
import SidePanel from "./SidePanel";
import CategoryListItem from "./CategoryListItem";

export default function CategoryList(): JSX.Element {
  const { categories, setCategories, rooms, setRooms } = useMeetingsStore();

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const res = await getAllCategories();
        const roomCategories = res.filter((category) => category.itemType === "room");
        setCategories(roomCategories);
      } catch (error) {
        throw new Error();
      }
    };
    void fetchCategories();

    const fetchItems = async (): Promise<void> => {
      try {
        const res = await getAllRooms();
        setRooms(res);
      } catch (error) {
        throw new Error();
      }
    };

    void fetchItems();
  }, []);

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
