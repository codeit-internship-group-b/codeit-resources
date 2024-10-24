/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { CATEGORIES } from "../mockData";
import CategoryTab from "./CategoryTab";
import SortDropdown from "./SortDropdown";

interface NavigationProps {
  activeTab: string;
  onTabChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (value: string | boolean) => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
  selectedSort,
  onSortChange,
}: NavigationProps): JSX.Element {
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
        <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
      </div>
    </nav>
  );
}
