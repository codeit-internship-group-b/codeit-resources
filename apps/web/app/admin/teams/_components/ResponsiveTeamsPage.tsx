"use client";

import { Suspense, useEffect, useState } from "react";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import TeamListHeader from "./TeamListHeader";
import TeamListSkeletonGroup from "./skeleton/TeamListSkeletonGroup";
import TeamList from "./TeamList";
import TeamSettingsModal from "./TeamSettingsModal";

export default function ResponsiveTeamsPage(): JSX.Element | null {
  const isMobile = useIsMobileStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isMobile) setIsOpen(true);
    else setIsOpen(false);
  }, [isMobile]);

  // TODO : 모달 닫으면 settings 페이지로 이동?

  return (
    <>
      <TeamListHeader />
      <Suspense fallback={<TeamListSkeletonGroup />}>
        <TeamList />
      </Suspense>

      <TeamSettingsModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
