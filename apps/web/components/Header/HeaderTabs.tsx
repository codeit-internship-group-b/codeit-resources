"use client";

import cn from "@ui/src/utils/cn";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate, getDatesForSeats, getDatesFromToday } from "@ui/src/utils/date";
import { useRouter } from "next/navigation";
import { useDateStore } from "@/app/store/useDateStore";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function HeaderTabs({ page }: HeaderProps): JSX.Element {
  const { selectedDate, setSelectedDate } = useDateStore();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dates = page === "seats" ? getDatesForSeats(2) : getDatesFromToday(selectedDate.year, selectedDate.month, 3);
  const router = useRouter();

  useEffect(() => {
    const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;
    router.push(`/${page}?date=${formattedDate}`);
  }, [selectedDate, router, page]);

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
    router.push(
      `/${page}/date?=${String(selectedDate.year)}-${String(selectedDate.month)}-${String(selectedDate.day)}`,
    );
  };
  return (
    <div className="h-45 relative top-4 flex items-end gap-24 md:static">
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
