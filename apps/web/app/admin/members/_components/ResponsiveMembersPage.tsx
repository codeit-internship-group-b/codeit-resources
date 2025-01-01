"use client";

import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import ErrorResetBoundary from "@/components/common/ErrorResetBoundary";
import ErrorFallback from "@/components/common/Fallback";
import { useRedirectOnMobile } from "@/src/hooks/useRediectOnMobile";
import MembersContent from "./MembersContent";

export default function ResponsiveMembersPage(): JSX.Element {
  useRedirectOnMobile(PAGE_NAME.SETTINGS);

  return (
    <ErrorResetBoundary fallbackComponent={ErrorFallback}>
      <MembersContent />
    </ErrorResetBoundary>
  );
}
