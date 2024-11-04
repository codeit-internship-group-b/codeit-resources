"use client";

import { useState, useMemo } from "react";
import { Toast } from "@ui/index";
import { type MemberWithStaticImage, type SortOption, SORT_OPTIONS } from "../types";
import { useMembersQuery } from "../_hooks/useMembersQuery";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Navigation from "./Navigation";
import MemberListItem from "./MemberListItem";
import EmptyState from "./EmptyState";
import SkeletonList from "./SkeletonList";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS.NEWEST);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);

  const { data: sortedMembers, isLoading } = useMembersQuery(selectedSort);
  const { data: allMembers } = useMembersQuery(SORT_OPTIONS.NEWEST);

  const teams = useMemo(() => {
    if (!allMembers) return ["전체"];

    const allTeams = allMembers.flatMap((member) => member.teams);
    const uniqueTeams = ["전체", ...new Set(allTeams)];

    return uniqueTeams;
  }, [allMembers]);

  const filteredMembers = useMemo(() => {
    if (!sortedMembers) return [];

    const members =
      activeTab === "전체" ? sortedMembers : sortedMembers.filter((member) => member.teams.includes(activeTab));

    return members;
  }, [sortedMembers, activeTab]);

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

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return <SkeletonList />;
    }

    return filteredMembers.length === 0 ? (
      <EmptyState activeTab={activeTab} />
    ) : (
      <div className="flex flex-col gap-16">
        {filteredMembers.map((member) => (
          <MemberListItem key={member._id} member={member} onMemberClick={handleMemberClick} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Header onAddMember={handleOpenSidePanel} />
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        teams={teams}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />
      <main>{renderContent()}</main>
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </>
  );
}
