"use client";

import { TextBalloonIcon } from "@ui/public";
import Button from "@ui/src/components/common/Button";
import { useRouter } from "next/navigation";
import { memo } from "react";

function EmptyState(): JSX.Element {
  const router = useRouter();

  const handleOnClick = (): void => {
    router.push("/meetings");
  };

  return (
    <div className="h-253 rounded-16 bg-gray-10 flex w-full flex-col items-center py-52">
      <span className="rounded-12 mb-16 block size-44 bg-gray-200/10 p-10">
        <TextBalloonIcon className="size-22" />
      </span>
      <p className="text-custom-black/80 text-15 mb-24">오늘 예정된 미팅이 없어요.</p>
      <Button onClick={handleOnClick} variant="Secondary">
        미팅 잡기
      </Button>
    </div>
  );
}

export default memo(EmptyState);
