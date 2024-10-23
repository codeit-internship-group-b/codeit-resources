/* eslint-disable @typescript-eslint/no-confusing-void-expression */
"use client";

import { useState } from "react";
import Button from "@ui/src/components/common/Button";
import Dropdown from "@ui/src/components/common/Dropdown";

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

const sortOptions = ["최신순", "가나다순", "오래된순"];

export default function ComponentWithUseClient(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순");

  const handleCategoryClick = (category: string): void => {
    setActiveTab(category);
  };

  const handleSortChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedSort(value);
    }
  };

  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-3xl-bold mb-40">멤버 관리</h1>
        <Button variant="Secondary" className="w-122 h-42 text-lg-medium text-custom-black/80">
          + 멤버 추가
        </Button>
      </header>

      {/* 네비게이션 */}
      <div className="relative">
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

          <div className="bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
            <Dropdown selectedValue={selectedSort} onSelect={handleSortChange} size="sm">
              <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
              <Dropdown.Wrapper className="-left-34 top-32">
                {sortOptions.map((option) => (
                  <Dropdown.Item hoverStyle="purple" key={option} value={option}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Wrapper>
            </Dropdown>
          </div>
        </nav>
      </div>
    </div>
  );
}
