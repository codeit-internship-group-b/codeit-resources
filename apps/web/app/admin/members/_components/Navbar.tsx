import { useMemo } from "react";
import { CATEGORIES } from "@repo/constants/teams";
import type { SortOption } from "@repo/types/src/membersType";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import { useMembersQuery } from "../_hooks/useMembersQuery";
import { Tab } from "./Tab";
import SortDropdown from "./SortDropdown";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedSort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function Navbar({ activeTab, onTabChange, selectedSort, onSortChange }: NavbarProps): JSX.Element {
  const isMobile = useIsMobileStore();
  const { data: members } = useMembersQuery(selectedSort);

  const filteredTeams = useMemo(() => {
    if (!members) return ["전체"];

    return CATEGORIES.filter(
      (category) =>
        category === "전체" ||
        category === "어드민" ||
        category === "멤버" ||
        members.some((member) => member.teams.includes(category)),
    );
  }, [members]);

  return (
    <nav className="relative mb-24">
      <div
        className="w-full overflow-x-auto border-b border-gray-200/10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Tab activeTab={activeTab} onTabChange={onTabChange} filteredTeams={filteredTeams} />
        {!isMobile && (
          <div className="md:bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
            <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
          </div>
        )}
      </div>
    </nav>
  );
}
