"use client";

import { Chevron, GearIcon } from "@ui/public";
import Link from "next/link";
import { useDateStore } from "@/app/store/useDateStore";
import HeaderTabs from "./HeaderTabs";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function Header({ page }: HeaderProps): JSX.Element {
  const { selectedDate, handlePrevMonth, handleNextMonth } = useDateStore();
  const today = new Date();
  const isPrevMonthDisabled = selectedDate.year === today.getFullYear() && selectedDate.month === today.getMonth() + 1;

  return (
    <div className="h-176 md:h-149 border-custom-black/20 pt-62 border-b border-solid bg-white pl-16 md:pl-64 md:pt-24">
      <div className="h-41 flex md:h-56">
        <h1 className="pr-13 !text-custom-black text-2xl-bold md:text-3xl-bold pb-13 md:pb-40 md:pr-24">
          {page === "meetings" ? "회의실 예약" : "좌석예약"}
        </h1>
        {page === "seats" && (
          <Link href="admin/seats">
            <GearIcon className="gear-icon relative right-10 top-3 cursor-pointer md:hidden" />
          </Link>
        )}
        {page === "meetings" && (
          <div>
            <div className="flex items-center gap-16">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="disabled:cursor-not-allowed"
                disabled={isPrevMonthDisabled}
              >
                <Chevron />
              </button>
              <div className="text-2xl-bold text-custom-black select-none">
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
