"use client";

import { useState } from "react";
import { Button } from "@ui/index";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import { useLockBodyScroll } from "@ui/src/hooks/useLockBodyScroll";
import Header from "./Header";
import Navbar from "./Navbar";
import MemberList from "./MemberList";
import SidePanel from "./sidepanel";

export default function MembersContent(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");
  const [keyword, setKeyword] = useState("");

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
    <div className={`flex h-screen flex-col ${isSidePanelOpen ? "overflow-hidden" : ""}`}>
      <div className="sticky top-0 z-10 bg-white md:mt-80">
        <Header onMemberSelect={handleOpenSidePanel} onSearch={setKeyword} keyword={keyword} />
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
      </div>

      <div className="no-scrollbar overflow-y-auto">
        <MemberList
          selectedSort={selectedSort}
          activeTab={activeTab}
          onMemberClick={handleMemberClick}
          keyword={keyword}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 mx-16 mb-32 bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] md:hidden">
        <Button variant="Primary" type="button" className="h-48 w-full" onClick={handleOpenSidePanel}>
          + 멤버추가
        </Button>
      </div>

      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
    </div>
  );
}
