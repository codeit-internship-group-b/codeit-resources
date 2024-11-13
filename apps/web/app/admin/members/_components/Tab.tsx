import TabItem from "./TabItem";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredTeams: string[];
}

export function Tab({ activeTab, onTabChange, filteredTeams }: TabsProps): JSX.Element {
  return (
    <ul className="flex flex-row gap-32 whitespace-nowrap">
      {filteredTeams.map((team) => (
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
