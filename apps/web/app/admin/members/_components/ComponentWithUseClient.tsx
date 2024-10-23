/* eslint-disable @typescript-eslint/no-confusing-void-expression */
"use client";

import { useState } from "react";
import Button from "@ui/src/components/common/Button";
import { SortIcon } from "@ui/public";

const categories = [
  "전체",
  "멤버",
  "어드민",
  "Management",
  "Finance",
  "Strategy",
  "Brand Experience",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
];

export default function ComponentWithUseClient(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");

  const handleCategoryClick = (category: string): void => {
    setActiveTab(category);
  };

  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-3xl-bold mb-40">멤버 관리</h1>
        <Button variant="Secondary" className="w-122 h-42 text-lg-medium text-custom-black/80">
          + 멤버 추가
        </Button>
      </header>

      <nav
        className="w-full overflow-x-auto border-b border-gray-200/10"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <ul className="flex flex-row gap-32 whitespace-nowrap">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`text-lg-bold relative pb-8 ${activeTab === category ? "text-custom-black/80" : "text-custom-black/50"}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                {activeTab === category && (
                  <span className="bg-custom-black/80 absolute bottom-0 left-0 h-2 w-full transition-all duration-300" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
