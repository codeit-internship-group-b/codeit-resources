/* eslint-disable react/no-array-index-key */
import LoadingBar from "@/components/common/Skeleton/LoadingBar";
import Tab from "./Tab";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredTeams: string[];
  isLoading?: boolean;
}

export function Tabs({ activeTab, onTabChange, filteredTeams, isLoading }: TabsProps): JSX.Element {
  if (isLoading) {
    return (
      <ul className="flex flex-row gap-32 whitespace-nowrap">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="py-8">
            <LoadingBar classNames="w-60 h-12" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-row gap-32 whitespace-nowrap">
      {filteredTeams.map((team) => (
        <Tab
          key={team}
          team={team}
          isActive={activeTab === team}
          onClick={() => {
            onTabChange(team);
          }}
        />
      ))}
    </ul>
  );
}
