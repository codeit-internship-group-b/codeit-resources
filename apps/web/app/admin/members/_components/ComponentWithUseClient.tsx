/* eslint-disable @typescript-eslint/no-confusing-void-expression */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@ui/src/components/common/Button";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Badge, Toast } from "@ui/index";
import { type Member, MOCK_MEMBERS, CATEGORIES } from "../mockData";
import SidePanel from "./SidePanel";

const USER_ROLES = ["멤버", "어드민"];
const SORT_OPTIONS = ["최신순", "가나다순", "오래된순"];

export default function ComponentWithUseClient(): JSX.Element {
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

  const handleCategoryClick = (category: string): void => {
    setActiveTab(category);
  };

  const handleSortChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedSort(value);
    }
  };

  const handleMemberClick = (member: Member): void => {
    setSelectedMember(member);
    setIsSidePanelOpen(true);
  };

  const handleRoleChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setSelectedRole(value);
    }
  };

  return (
    <div>
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
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ul className="flex flex-row gap-32 whitespace-nowrap">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={`text-lg-bold relative pb-8 ${activeTab === category ? "text-custom-black/80" : "text-custom-black/50"}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                  {activeTab === category && (
                    <span className="bg-custom-black/80 absolute bottom-0 left-0 h-2 w-full transition-all duration-300" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
            <Dropdown selectedValue={selectedSort} onSelect={handleSortChange} size="sm">
              <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
              <Dropdown.Wrapper className="-left-34 top-32">
                {SORT_OPTIONS.map((option) => (
                  <Dropdown.Item hoverStyle="purple" key={option} value={option}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Wrapper>
            </Dropdown>
          </div>
        </div>
      </nav>

      <main className="flex flex-col gap-16">
        {MOCK_MEMBERS.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => handleMemberClick(member)}
            className="rounded-12 flex items-center border border-gray-200/10 px-24 py-16 outline outline-1 outline-transparent transition-all duration-300 hover:border-transparent hover:bg-purple-700/5 hover:outline-purple-300"
          >
            <div className="flex items-center gap-16">
              <Image
                src={member.profileImage}
                alt={`${member.name}의 프로필`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-custom-black">{member.name}</span>
              <span className="text-custom-black/60 max-w-200 overflow-wrap-break-word mr-16 break-all">
                {member.email}
              </span>
            </div>

            <div className="mr-16 flex flex-grow flex-wrap gap-16">
              {member.teams.map((team) => (
                <Badge key={team} color="purple" colorApplyTo="font" shape="round">
                  {team}
                </Badge>
              ))}
            </div>

            <Dropdown selectedValue={member.role} onSelect={handleRoleChange} size="sm">
              <Dropdown.Toggle>{member.role}</Dropdown.Toggle>
              <Dropdown.Wrapper className="top-42">
                {USER_ROLES.map((role) => (
                  <Dropdown.Item hoverStyle="purple" key={role} value={role}>
                    {role}
                  </Dropdown.Item>
                ))}
              </Dropdown.Wrapper>
            </Dropdown>
          </button>
        ))}
      </main>

      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} selectedMember={selectedMember} />
      <Toast />
    </div>
  );
}
