"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "@ui/src/components/common/EmptyState";
import { getAllCategories, getAllRooms } from "@/api/meetings";
import LoadingBar from "@/components/common/Skeleton/LoadingBar";
import { notify } from "@/app/store/useToastStore";
import useMeetingsStore from "../_store/useMeetingsStore";
import SidePanel from "./SidePanel";
import CategoryListItem from "./CategoryListItem";

export default function CategoryList(): JSX.Element {
  const { categories, setCategories, rooms, setRooms } = useMeetingsStore();

  const {
    data: fetchedCategories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const {
    data: fetchedRooms,
    isLoading: isRoomsLoading,
    error: roomsError,
  } = useQuery({ queryKey: ["rooms"], queryFn: getAllRooms });

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

  if (categoriesError ?? roomsError) {
    notify("error", "데이터를 불러오는데 실패했습니다.");
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  const categoriesWithRooms = categories.map((category) => ({
    ...category,
    rooms: rooms.filter((room) => room.category._id === category._id),
  }));

  return (
    <>
      {isCategoriesLoading || (isRoomsLoading && <LoadingBar classNames="w-full h-72" />)}
      {!isCategoriesLoading && categories.length === 0 && (
        <EmptyState message={{ title: "", description: "등록된 카테고리가 없습니다." }} />
      )}
      {categoriesWithRooms.map((category) => {
        return <CategoryListItem key={category._id} category={category} rooms={category.rooms} />;
      })}
      <SidePanel />
    </>
  );
}
