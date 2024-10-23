"use client";

import { Chevron } from "@ui/public";
import HeaderTabs from "./HeaderTabs";
import { useDateStore } from "@/app/store/useDateStore";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function Header({ page }: HeaderProps): JSX.Element {
  const { selectedDate, handlePrevMonth, handleNextMonth } = useDateStore();

  return (
    <div className="h-156 md:h-149 border-custom-black/20 pt-62 border-b border-solid bg-white pl-16 md:pl-64 md:pt-24">
      <div className="flex">
        <h1 className="pr-13 !text-custom-black text-2xl-bold md:text-3xl-bold pb-13 md:pb-40 md:pr-24">
          {page === "meetings" ? "회의실 예약" : "좌석예약"}
        </h1>
        {page === "meetings" && (
          <div>
            <div className="flex items-center gap-16">
              <Chevron onClick={handlePrevMonth} className="cursor-pointer" />
              <div className="text-2xl-bold text-custom-black">
                {selectedDate.year}년 {selectedDate.month}월
              </div>
              <Chevron onClick={handleNextMonth} className="rotate-180 cursor-pointer" />
            </div>
          </div>
        )}
      </div>
      <HeaderTabs page={page} />
    </div>
  );
}
