"use client";

import { useState } from "react";
import { Toast } from "@ui/index";
import { MOCK_MEMBERS } from "../mockData";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Navigation from "./Navigation";
import MemberListItem from "./MemberListItem";
import { type MemberWithStaticImport } from "./ComponentWithUseClient.types";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImport | null>(null);

  const handleOpenSidePanel = (): void => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = (): void => {
    setIsSidePanelOpen(false);
    setSelectedMember(null);
  };

  const handleMemberClick = (member: MemberWithStaticImport): void => {
    setSelectedMember(member);
    setIsSidePanelOpen(true);
  };

  return (
    <div>
      <Header onAddMember={handleOpenSidePanel} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex flex-col gap-16">
        {MOCK_MEMBERS.map((member) => (
          <MemberListItem key={member.id} member={member} onMemberClick={handleMemberClick} />
        ))}
      </main>
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </div>
  );
}
