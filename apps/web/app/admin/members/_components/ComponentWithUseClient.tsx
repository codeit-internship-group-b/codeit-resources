"use client";

import { useState, useMemo, useEffect } from "react";
import { Toast, Button } from "@ui/index";
import { CATEGORIES } from "@repo/ui/src/utils/constants/teams";
import { Chevron } from "@ui/public";
import useIsMobileStore from "@/app/store/useIsMobileStore";
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

  const isMobile = useIsMobileStore();

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

  useEffect(() => {
    if (isSidePanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidePanelOpen]);

  return (
    <div className={isSidePanelOpen ? "overflow-hidden" : ""}>
      <header>
        {isMobile ? (
          <>
            <div className="mb-28 flex items-center justify-between">
              <Chevron />
              <h1 className="text-xl-bold">멤버 관리</h1>
              <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
            </div>
            <nav className="relative mb-24">
              <div
                className="w-full overflow-x-auto border-b border-gray-200/10"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <Tabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  filteredTeams={filteredTeams}
                  isLoading={isLoading}
                />
              </div>
            </nav>
          </>
        ) : (
          <>
            <div className="mb-40 flex justify-between">
              <h1 className="text-3xl-bold">멤버 관리</h1>
              <Button
                onClick={handleOpenSidePanel}
                variant="Secondary"
                className="w-122 h-42 text-lg-medium text-custom-black/80"
              >
                + 멤버 추가
              </Button>
            </div>
            <nav className="relative mb-24">
              <div
                className="w-full overflow-x-auto border-b border-gray-200/10"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <Tabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  filteredTeams={filteredTeams}
                  isLoading={isLoading}
                />
                <div className="md:bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
                  <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
                </div>
              </div>
            </nav>
          </>
        )}
      </header>

      <main>
        <MemberList
          isLoading={isLoading}
          members={filteredMembers}
          activeTab={activeTab}
          onMemberClick={handleMemberClick}
        />
      </main>

      {isMobile ? (
        <div className="shadow-[0px 4px 12px 0px rgba(0, 0, 0, 0.2)] fixed bottom-0 left-0 right-0 z-10 px-24 pb-32">
          <Button variant="Primary" type="button" className="h-48 w-full" onClick={handleOpenSidePanel}>
            + 멤버추가
          </Button>
        </div>
      ) : null}

      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </div>
  );
}
