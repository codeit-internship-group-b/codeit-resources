/* eslint-disable react/no-array-index-key */
"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toast } from "@ui/index";
import { getMembers } from "@/api/members";
import ListItemSkeleton from "@/components/common/Skeleton/ListItemSkeleton";
import { type MemberWithStaticImage } from "../types";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Navigation from "./Navigation";
import MemberListItem from "./MemberListItem";

type SortOption = "newest" | "oldest" | "alphabetical";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["members", selectedSort],
    queryFn: () => getMembers(selectedSort),
  });

  const { data: originalData } = useQuery({
    queryKey: ["members", "newest"],
    queryFn: () => getMembers("newest"),
  });

  const teams = useMemo(() => {
    if (!originalData) return ["전체"];

    const allTeams = originalData.flatMap((member) => member.teams);
    const uniqueTeams = ["전체", ...new Set(allTeams)];

    return uniqueTeams;
  }, [originalData]);

  const filteredMembers = useMemo(() => {
    if (!data) return [];
    const members = activeTab === "전체" ? data : data.filter((member) => member.teams.includes(activeTab));

    return members;
  }, [data, activeTab]);

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

  if (isLoading) {
    return (
      <div>
        <Header onAddMember={handleOpenSidePanel} />
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          teams={teams}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          isLoading={isLoading}
        />
        <main>
          <div className="flex flex-col gap-16">
            {Array.from({ length: 8 }).map((_, index) => (
              <ListItemSkeleton key={index} type="member" thickness="thick" color="white" showHamburger={false} />
            ))}
          </div>
        </main>
        <Toast />
      </div>
    );
  }

  return (
    <div>
      <Header onAddMember={handleOpenSidePanel} />
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        teams={teams}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />
      <main>
        {filteredMembers.length === 0 ? (
          <div className="min-h-400 flex items-center justify-center">
            <p className="text-20 text-custom-black/60">
              {activeTab === "전체" ? "등록된 멤버가 없습니다." : `${activeTab} 팀에 속한 멤버가 없습니다.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {filteredMembers.map((member) => (
              <MemberListItem key={member._id} member={member} onMemberClick={handleMemberClick} />
            ))}
          </div>
        )}
      </main>
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </div>
  );
}
