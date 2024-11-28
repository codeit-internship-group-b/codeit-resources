import MemberListSkeleton from "./MemberListSkeleton";
import TabsSkeleton from "./TabSkeleton";

export default function Skeleton(): JSX.Element {
  return (
    <>
      <header className="mb-40 flex justify-between">
        <h1 className="text-3xl-bold">멤버 관리</h1>
      </header>
      <TabsSkeleton />
      <MemberListSkeleton />
    </>
  );
}
