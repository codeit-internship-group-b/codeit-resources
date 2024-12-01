import { Chevron, SearchIcon } from "@ui/public";
import MemberListSkeleton from "./MemberListSkeleton";
import TabsSkeleton from "./TabSkeleton";

export default function Skeleton(): JSX.Element {
  return (
    <>
      <header className="my-16 flex items-center justify-between gap-20 md:mb-40 md:mt-80">
        <Chevron className="animate-pulse md:hidden" />
        <h1 className="text-3xl-bold hidden md:block">멤버 관리</h1>
        <div className="h-54 relative w-full md:hidden">
          <div className="rounded-100 flex h-full w-full items-center gap-14 bg-gray-100/30 px-20">
            <SearchIcon />
          </div>
        </div>
      </header>
      <TabsSkeleton />
      <MemberListSkeleton />
    </>
  );
}
