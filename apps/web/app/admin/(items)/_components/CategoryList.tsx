"use client";

import { useEffect, useState } from "react";
import { type ICategory } from "@repo/types";
import { getAllCategories } from "@/api/meetings";
import CategoryListItem from "./CategoryListItem";

export default function CategoryList(): JSX.Element {
  const [categories, setCategories] = useState<ICategory[]>([]);

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
  }, []);
  return (
    <div>
      <div>
        {categories.map((category) => (
          <CategoryListItem key={category._id} prevCategory={category} />
        ))}
      </div>
    </div>
  );
}
