"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toast } from "@ui/index";
import { getMembers } from "@/app/api/members";
import { type MemberWithStaticImage } from "../types";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Navigation from "./Navigation";
import MemberListItem from "./MemberListItem";

export default function Members(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberWithStaticImage | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

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

  // TODO: 스켈레톤 UI로 변경
  if (isLoading) return <div>Loading...💫</div>;
  if (error) return <div>Error🚨</div>;

  return (
    <div>
      <Header onAddMember={handleOpenSidePanel} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {data?.length === 0 ? (
          <div className="min-h-400 flex items-center justify-center">
            <p className="text-20 text-custom-black/60">등록된 멤버가 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {data?.map((member) => (
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
