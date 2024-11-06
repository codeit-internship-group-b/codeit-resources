import { memo } from "react";
import TeamListSkeleton from "./TeamListSkeleton";

function TeamListSkeletonGroup(): JSX.Element {
  return (
    <div className="mt-40">
      {Array.from({ length: 10 }).map((_, index) => (
        // index 이외 고유 key값 X
        // eslint-disable-next-line react/no-array-index-key
        <TeamListSkeleton key={`TeamListSkeleton-${index}`} />
      ))}
    </div>
  );
}

export default memo(TeamListSkeletonGroup);
