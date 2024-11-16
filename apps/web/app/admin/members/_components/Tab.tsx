import { ROLES } from "@repo/constants/teams";
import { useTeams } from "@/app/admin/teams/_hooks/useTeams";
import TabItem from "./TabItem";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Tab({ activeTab, onTabChange }: TabsProps): JSX.Element {
  const { data } = useTeams();

  const names = data.map(({ name }) => name);
  const teamList = [...ROLES, ...names];

  return (
    <ul className="flex flex-row gap-32 whitespace-nowrap">
      {teamList.map((team) => (
        <TabItem
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
