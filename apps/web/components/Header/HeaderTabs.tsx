"use client";

import cn from "@ui/src/utils/cn";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDate, getDatesForSeats, getDatesFromTodayToEndOfMonth } from "@ui/src/utils/date";
import { useDateStore } from "@/app/store/useDateStore";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function HeaderTabs({ page }: HeaderProps): JSX.Element {
  const { selectedDate, setSelectedDate } = useDateStore();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dates =
    page === "seats" ? getDatesForSeats(2) : getDatesFromTodayToEndOfMonth(selectedDate.year, selectedDate.month);

  const handleActiveTab = (index: number): void => {
    setActiveTabIndex(index);
    const datesFromToday = dates[index];
    if (datesFromToday) {
      setSelectedDate({
        year: datesFromToday.getFullYear(),
        month: datesFromToday.getMonth() + 1,
        day: datesFromToday.getDate(),
      });
    }
  };

  return (
    <div className="h-45 scrollbar-hidden relative top-4 flex items-end gap-24 overflow-auto md:static">
      {dates.map((date, index) => (
        <motion.div
          key={String(date)}
          className="flex min-w-fit cursor-pointer flex-col gap-16"
          onClick={() => {
            handleActiveTab(index);
          }}
          role="tab"
          aria-selected={activeTabIndex === index}
          tabIndex={0}
          whileHover={activeTabIndex !== index ? { scale: 0.96 } : {}}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className={cn({
              "text-text-default": activeTabIndex !== index,
              "text-text-inverse font-bold": activeTabIndex === index,
            })}
            animate={{
              color: activeTabIndex === index ? "#6500C2" : "#c3c7cc",
            }}
            whileHover={activeTabIndex !== index ? { color: "#6500C2" } : {}}
            transition={{ duration: 0.2 }}
          >
            {formatDate(date, page)}
          </motion.span>
          <motion.span
            className="w-full border-b-2 border-solid"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: activeTabIndex === index ? 1 : 0,
              borderColor: activeTabIndex === index ? "#6500C2" : "rgba(255, 255, 255, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
