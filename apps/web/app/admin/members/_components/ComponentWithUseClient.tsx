/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
"use client";

import { useState } from "react";
import { Toast } from "@ui/index";
import { type Member, MOCK_MEMBERS } from "../mockData";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Navigation from "./Navigation";
import MemberListItem from "./MemberListItem";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedRole, setSelectedRole] = useState("어드민");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleOpenSidePanel = (): void => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = (): void => {
    setIsSidePanelOpen(false);
    setSelectedMember(null);
  };

  const handleSortChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedSort(value);
    }
  };

  const handleRoleChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedRole(value);
    }
  };

  return (
    <div>
      <Header onAddMember={handleOpenSidePanel} />
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />
      <main className="flex flex-col gap-16">
        {MOCK_MEMBERS.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onMemberClick={(member) => {
              setSelectedMember(member);
              setIsSidePanelOpen(true);
            }}
            onRoleChange={handleRoleChange}
          />
        ))}
      </main>
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </div>
  );
}
