"use client";

import { Suspense } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRedirectOnMobile } from "@/src/hooks/useRediectOnMobile";
import TeamListHeader from "./TeamListHeader";
import TeamListSkeletonGroup from "./skeleton/TeamListSkeletonGroup";
import TeamList from "./TeamList";

export default function ResponsiveTeamsPage(): JSX.Element | null {
  useRedirectOnMobile(PAGE_NAME.SETTINGS);

  return (
    <>
      <TeamListHeader />
      <Suspense fallback={<TeamListSkeletonGroup />}>
        <TeamList />
      </Suspense>
    </>
  );
}
