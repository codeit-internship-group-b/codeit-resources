import { memo } from "react";
import { PersonEmptyIcon } from "@ui/public";
import ListItem from "@ui/src/components/common/ListItem";
import LoadingBar from "./LoadingBar";

interface ListItemSkeletonProps {
  type?: "team" | "member";
  thickness: "thin" | "thick";
  color: "white" | "gray";
}

/**
 * 팀 또는 멤버를 나타내는 리스트 항목의 스켈레톤 로딩 컴포넌트입니다.
 *
 * @param type - "team" 또는 "member"를 지정하며, 기본값은 "team"입니다.
 * @param thickness - 리스트 항목의 높이를 "thin" 또는 "thick"으로 지정합니다.
 * @param color - 리스트 항목의 배경색을 "white" 또는 "gray"로 지정합니다.
 * @returns JSX 요소를 반환합니다.
 */

function ListItemSkeleton({ type = "team", thickness = "thick", color = "white" }: ListItemSkeletonProps): JSX.Element {
  return (
    <ListItem thickness={thickness} color={color}>
      <div className="flex flex-grow items-center gap-32 text-left">
        {type === "member" && (
          <>
            <PersonEmptyIcon />
            <LoadingBar width="w-44" />
          </>
        )}
        <LoadingBar width={type === "team" ? "w-100" : "w-200"} />
      </div>
    </ListItem>
  );
}

export default memo(ListItemSkeleton);
