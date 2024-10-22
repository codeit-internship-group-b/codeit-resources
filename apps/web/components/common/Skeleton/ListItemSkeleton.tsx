import { memo } from "react";
import { PersonEmptyIcon } from "@ui/public";
import LoadingBar from "./LoadingBar";
import ListItem from "@/components/ListItem";

interface ListItemSkeletonProps {
  type: "team" | "member";
}

function ListItemSkeleton({ type = "team" }: ListItemSkeletonProps): JSX.Element {
  return (
    <ListItem type="team">
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
