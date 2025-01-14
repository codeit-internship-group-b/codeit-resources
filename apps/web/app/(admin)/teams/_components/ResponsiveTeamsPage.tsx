"use client";

import { Suspense } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRedirectOnMobile } from "@/app/_hooks/useRediectOnMobile";
import ErrorResetBoundary from "@/components/common/ErrorResetBoundary";
import ErrorFallback from "@/components/common/Fallback";
import TeamListHeader from "./TeamListHeader";
import TeamListSkeletonGroup from "./skeleton/TeamListSkeletonGroup";
import TeamList from "./TeamList";

export default function ResponsiveTeamsPage(): JSX.Element | null {
  useRedirectOnMobile(PAGE_NAME.SETTINGS);

  return (
    <>
      <TeamListHeader />
      <ErrorResetBoundary fallbackComponent={ErrorFallback}>
        <Suspense fallback={<TeamListSkeletonGroup />}>
          <TeamList />
        </Suspense>
      </ErrorResetBoundary>
    </>
  );
}
