"use client";

import { Chevron, SearchIcon } from "@ui/public";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import MemberListSkeleton from "./MemberListSkeleton";
import TabsSkeleton from "./TabSkeleton";

export default function Skeleton(): JSX.Element {
  const isMobile = useIsMobileStore();

  return (
    <>
      {isMobile ? (
        <header className="my-16 flex items-center justify-between gap-20">
          <Chevron className="animate-pulse" />
          <div className="h-54 relative w-full">
            <div className="rounded-100 flex h-full w-full items-center gap-14 bg-gray-100/30 px-20">
              <SearchIcon />
            </div>
          </div>
        </header>
      ) : (
        <header className="mb-40 flex justify-between">
          <h1 className="text-3xl-bold">멤버 관리</h1>
        </header>
      )}
      <TabsSkeleton />
      <MemberListSkeleton />
    </>
  );
}
