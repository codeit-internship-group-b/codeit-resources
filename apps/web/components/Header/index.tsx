"use client";

import { useState } from "react";
import { Chevron } from "@ui/public";
import HeaderTabs from "./HeaderTabs";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function Header({ page }: HeaderProps): JSX.Element {
  // const [month, setMonth] = useState(new Date().getMonth() + 1);

  // const handlePrevMonth = (): void => {
  //   setMonth(month - 1);
  // };

  // const handleNextMonth = (): void => {
  //   setMonth(month + 1);
  // };

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handlePrevMonth = (): void => {
    if (date.month === 1) {
      setDate({
        year: date.year - 1,
        month: 12,
      });
    } else {
      setDate((prevDate) => ({
        ...prevDate,
        month: prevDate.month - 1,
      }));
    }
  };

  const handleNextMonth = (): void => {
    if (date.month === 12) {
      setDate({
        year: date.year + 1,
        month: 1,
      });
    } else {
      setDate((prevDate) => ({
        ...prevDate,
        month: prevDate.month + 1,
      }));
    }
  };

  return (
    <div className="h-156 md:h-149 border-custom-black/20 pt-62 w-screen border-b border-solid pl-16 md:pl-64 md:pt-24">
      <div className="flex">
        <h1 className="pr-13 text-custom-black text-2xl-bold md:text-3xl-bold pb-13 md:pb-40 md:pr-24">
          {page === "meetings" ? "회의실 예약" : "좌석예약"}
        </h1>
        {page === "meetings" && (
          <div>
            <div className="flex items-center gap-16">
              <Chevron onClick={handlePrevMonth} className="cursor-pointer" />
              <div className="text-2xl-bold">
                {date.year}년 {date.month}월
              </div>
              <Chevron onClick={handleNextMonth} className="rotate-180 cursor-pointer" />
            </div>
          </div>
        )}
      </div>
      <HeaderTabs page={page} year={date.year} month={date.month} />
    </div>
  );
}
