/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState } from "react";
import { SORT_OPTIONS } from "@ui/src/utils/constants/sortOptions";
import Tab from "./Tab";
import SortDropdown from "./SortDropdown";

interface NavigationProps {
  activeTab: string;
  onTabChange: (category: string) => void;
  teams: string[];
}

export default function Navigation({ activeTab, onTabChange, teams }: NavigationProps): JSX.Element {
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

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
          {teams.map((team) => (
            <Tab key={team} team={team} isActive={activeTab === team} onClick={() => onTabChange(team)} />
          ))}
        </ul>
        <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
      </div>
    </nav>
  );
}
