/* eslint-disable @typescript-eslint/no-confusing-void-expression */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@ui/src/components/common/Button";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Badge } from "@ui/index";
import ProfileImage from "@ui/public/images/image_profile.png";

const CATEGORIES = [
  "전체",
  "멤버",
  "어드민",
  "Management",
  "Finance",
  "Strategy",
  "Brand Experience",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
  "People & Culture",
];

const USER_ROLES = ["멤버", "어드민"];
const SORT_OPTIONS = ["최신순", "가나다순", "오래된순"];

export default function ComponentWithUseClient(): JSX.Element {
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedRole, setSelectedRole] = useState("어드민");

  const handleCategoryClick = (category: string): void => {
    setActiveTab(category);
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
      <header className="flex justify-between">
        <h1 className="text-3xl-bold mb-40">멤버 관리</h1>
        <Button variant="Secondary" className="w-122 h-42 text-lg-medium text-custom-black/80">
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
        <div className="p rounded-12 flex items-center border border-gray-200/10 px-24 py-16">
          <div className="flex items-center gap-16">
            <Image src={ProfileImage} alt="profile image" width={40} height={40} className="rounded-full" />
            <span className="text-custom-black">김효준</span>
            <span className="text-custom-black/60 max-w-200 overflow-wrap-break-word mr-16 break-all">
              hyojune@codeit.com
            </span>
          </div>

          <div className="mr-16 flex flex-grow flex-wrap gap-16">
            <Badge color="purple" colorApplyTo="font" shape="round">
              Product
            </Badge>
            <Badge color="purple" colorApplyTo="font" shape="round">
              Content
            </Badge>
          </div>

          <Dropdown selectedValue={selectedRole} onSelect={handleRoleChange} size="sm">
            <Dropdown.Toggle>{selectedRole}</Dropdown.Toggle>
            <Dropdown.Wrapper className="top-42">
              {USER_ROLES.map((role) => (
                <Dropdown.Item hoverStyle="purple" key={role} value={role}>
                  {role}
                </Dropdown.Item>
              ))}
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </main>
    </div>
  );
}
