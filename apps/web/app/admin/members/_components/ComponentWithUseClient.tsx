"use client";

import { useState, useMemo } from "react";
import { Toast, Button } from "@ui/index";
import { CATEGORIES } from "@repo/ui/src/utils/constants/teams";
import { type MemberWithStaticImage, type SortOption, SORT_OPTIONS } from "../types";
import { useMembersQuery } from "../_hooks/useMembersQuery";
import SidePanel from "./SidePanel";
import { Tabs } from "./Tabs";
import SortDropdown from "./SortDropdown";
import MemberList from "./MemberList";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS.NEWEST);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);

  const { data: members, isLoading } = useMembersQuery(selectedSort);

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

  const filteredMembers = useMemo(() => {
    if (!members) return [];

    if (activeTab === "전체") {
      return members;
    }

    if (activeTab === "어드민") {
      return members.filter((member) => member.role === "admin");
    }

    if (activeTab === "멤버") {
      return members.filter((member) => member.role === "member");
    }

    return members.filter((member) => member.teams.includes(activeTab));
  }, [members, activeTab]);

  const handleSortChange = (value: string | boolean): void => {
    setSelectedSort(value as SortOption);
  };

  const handleOpenSidePanel = (): void => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = (): void => {
    setIsSidePanelOpen(false);
    setSelectedMember(null);
  };

  const handleMemberClick = (member: MemberWithStaticImage): void => {
    setSelectedMember(member);
    setIsSidePanelOpen(true);
  };

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-3xl-bold mb-40">멤버 관리</h1>
        <Button
          onClick={handleOpenSidePanel}
          variant="Secondary"
          className="w-122 h-42 text-lg-medium text-custom-black/80"
        >
          + 멤버 추가
        </Button>
      </header>

      <nav className="relative mb-24">
        <div
          className="w-full overflow-x-auto border-b border-gray-200/10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} filteredTeams={filteredTeams} isLoading={isLoading} />
          <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
        </div>
      </nav>

      <main>
        <MemberList
          isLoading={isLoading}
          members={filteredMembers}
          activeTab={activeTab}
          onMemberClick={handleMemberClick}
        />
      </main>

      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </>
  );
}
