"use client";

import Button from "@ui/src/components/common/Button";
import { useState } from "react";
import { Input } from "@ui/index";
import Sidebar from "@/components/common/Sidebar";

export default function TeamListHeader(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1>팀관리</h1>
        <Button variant="Secondary" onClick={handleButtonClick}>
          + 팀 추가
        </Button>
      </div>

      <Sidebar isOpen={isOpen} onClose={handleButtonClick}>
        <div className="flex h-full flex-col justify-between">
          <div className="gap-76 flex flex-col">
            <h1>팀 추가</h1>
            <Input placeholder="팀 이름" />
          </div>
          <Button className="w-full" variant="Primary">
            추가하기
          </Button>
        </div>
      </Sidebar>
    </>
  );
}
