/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import Tab from "./Tab";
import SortDropdown from "./SortDropdown";

interface NavigationProps {
  activeTab: string;
  onTabChange: (category: string) => void;
  teams: string[];
  selectedSort: string;
  onSortChange: (value: string | boolean) => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
  teams,
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
          {teams.map((team) => (
            <Tab key={team} team={team} isActive={activeTab === team} onClick={() => onTabChange(team)} />
          ))}
        </ul>
        <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
      </div>
    </nav>
  );
}
