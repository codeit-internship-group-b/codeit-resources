"use client";

import Button from "@ui/src/components/common/Button";
import { useState } from "react";
import { Chevron } from "@ui/public";
import Link from "next/link";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import SettingsModal from "@/components/SettingsModal/SettingsModal";
import CreateTeamSidebar from "./CreateTeamSidebar";

export default function TeamListHeader(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex items-center justify-center md:justify-between">
        <div className="absolute left-0 md:hidden">
          <Link href={PAGE_NAME.SETTINGS}>
            <Chevron className="h-40 w-40 p-10" />
          </Link>
        </div>
        <h1 className="text-20 md:text-28">팀 관리</h1>
        <Button className="hidden md:block" variant="Secondary" onClick={handleButtonClick}>
          + 팀 추가
        </Button>
      </div>

      <CreateTeamSidebar isOpen={isOpen} onClick={handleButtonClick} />
    </>
  );
}
