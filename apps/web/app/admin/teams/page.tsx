import { Suspense } from "react";
import TeamList from "./_components/TeamList";
import TeamListHeader from "./_components/TeamListHeader";
import TeamListSkeletonGroup from "./_components/skeleton/TeamListSkeletonGroup";

export default function TeamsPage(): JSX.Element {
  return (
    <>
      <TeamListHeader />
      <Suspense fallback={<TeamListSkeletonGroup />}>
        <TeamList />
      </Suspense>
    </>
  );
}
