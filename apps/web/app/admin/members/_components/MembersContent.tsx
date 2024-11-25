"use client";

import { useState } from "react";
import { Button } from "@ui/index";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import { useLockBodyScroll } from "@ui/src/hooks/useLockBodyScroll";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import Header from "./Header";
import Navbar from "./Navbar";
import MemberList from "./MemberList";
import SidePanel from "./sidepanel";

export default function MembersContent(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");

  const isMobile = useIsMobileStore();
  useLockBodyScroll(isSidePanelOpen);

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

  return (
    <div className={isSidePanelOpen ? "overflow-hidden" : ""}>
      <Header onSortChange={setSelectedSort} onMemberSelect={handleOpenSidePanel} />
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      <MemberList selectedSort={selectedSort} activeTab={activeTab} onMemberClick={handleMemberClick} />

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
