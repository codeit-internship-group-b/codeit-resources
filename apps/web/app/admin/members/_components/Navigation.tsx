/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import LoadingBar from "@/components/common/Skeleton/LoadingBar";
import Tab from "./Tab";
import SortDropdown from "./SortDropdown";

interface NavigationProps {
  activeTab: string;
  onTabChange: (category: string) => void;
  teams: string[];
  selectedSort: string;
  onSortChange: (value: string | boolean) => void;
  isLoading?: boolean;
}

export default function Navigation({
  activeTab,
  onTabChange,
  teams,
  selectedSort,
  onSortChange,
  isLoading,
}: NavigationProps): JSX.Element {
  return (
    <nav className="relative mb-24">
      <div
        className="w-full overflow-x-auto border-b border-gray-200/10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <ul className="flex flex-row gap-32 whitespace-nowrap">
          {isLoading ? (
            <>
              <li className="py-8">
                <LoadingBar width="w-60" />
              </li>
              <li className="py-8">
                <LoadingBar width="w-60" />
              </li>
              <li className="py-8">
                <LoadingBar width="w-60" />
              </li>
            </>
          ) : (
            teams.map((team) => (
              <Tab key={team} team={team} isActive={activeTab === team} onClick={() => onTabChange(team)} />
            ))
          )}
        </ul>
        <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
      </div>
    </nav>
  );
}
