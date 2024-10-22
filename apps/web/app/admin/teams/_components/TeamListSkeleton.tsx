import { BurgerIcon } from "@ui/public";
import { memo } from "react";

function TeamListSkeleton(): JSX.Element {
  return (
    <div className="boder-solid rounded-12 mb-16 flex h-72 items-center justify-between border border-gray-200/10 px-24 py-16">
      <div className="flex flex-grow items-center gap-32 text-left">
        <BurgerIcon />
        <div className="bg-gray-10 w-100 rounded-4 loading-animation h-12" />
      </div>
    </div>
  );
}

export default memo(TeamListSkeleton);
