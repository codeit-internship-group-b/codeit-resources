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
      <div className="flex justify-between">
        <h1>팀 관리</h1>
        <Button variant="Secondary" onClick={handleButtonClick}>
          + 팀 추가
        </Button>
      </div>

      <CreateTeamSidebar isOpen={isOpen} onClick={handleButtonClick} />
    </>
  );
}
