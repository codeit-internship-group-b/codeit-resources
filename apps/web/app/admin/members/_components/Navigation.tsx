/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState } from "react";
import { CATEGORIES } from "../mockData";
import CategoryTab from "./CategoryTab";
import SortDropdown from "./SortDropdown";

interface NavigationProps {
  activeTab: string;
  onTabChange: (category: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps): JSX.Element {
  const [selectedSort, setSelectedSort] = useState("최신순");

  const handleSortChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedSort(value);
    }
  };

  return (
    <nav className="relative mb-24">
      <div
        className="w-full overflow-x-auto border-b border-gray-200/10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <ul className="flex flex-row gap-32 whitespace-nowrap">
          {CATEGORIES.map((category) => (
            <CategoryTab
              key={category}
              category={category}
              isActive={activeTab === category}
              onClick={() => onTabChange(category)}
            />
          ))}
        </ul>
        <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
      </div>
    </nav>
  );
}
