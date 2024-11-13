"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@ui/index";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import { useMembersQuery } from "../_hooks/useMembersQuery";
import Header from "./Header";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import MemberList from "./MemberList";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");

  const { data: members } = useMembersQuery(selectedSort);
  const isMobile = useIsMobileStore();

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

  const handleMemberClick = (member: MemberWithStaticImage): void => {
    setSelectedMember(member);
    setIsSidePanelOpen(true);
  };

  const handleOpenSidePanel = (): void => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = (): void => {
    setIsSidePanelOpen(false);
    setSelectedMember(null);
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
      <Header onSortChange={setSelectedSort} onMemberSelect={handleOpenSidePanel} />
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      <MemberList members={filteredMembers} activeTab={activeTab} onMemberClick={handleMemberClick} />

      {isMobile ? (
        <div className="shadow-[0px 4px 12px 0px rgba(0, 0, 0, 0.2)] fixed bottom-0 left-0 right-0 z-10 px-24 pb-32">
          <Button variant="Primary" type="button" className="h-48 w-full" onClick={handleOpenSidePanel}>
            + 멤버추가
          </Button>
        </div>
      ) : null}

      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
    </div>
  );
}
