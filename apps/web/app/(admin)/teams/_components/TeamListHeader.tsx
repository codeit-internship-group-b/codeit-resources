"use client";

import Button from "@ui/src/components/common/Button";
import { useState } from "react";
import CreateTeamSidebar from "./CreateTeamSidebar";

export default function TeamListHeader(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex items-center justify-center md:mt-80 md:justify-between">
        <h1 className="text-xl-bold md:text-3xl-bold">팀 관리</h1>
        <Button className="hidden md:block" variant="Secondary" onClick={handleButtonClick}>
          + 팀 추가
        </Button>
      </div>

      <CreateTeamSidebar isOpen={isOpen} onClose={handleButtonClick} />
    </>
  );
}
