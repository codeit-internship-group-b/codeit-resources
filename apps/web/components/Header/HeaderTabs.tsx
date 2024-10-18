"use client";

import cn from "@ui/src/utils/cn";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDatesFromToday } from "@ui/src/utils/date";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function HeaderTabs({ page }: HeaderProps): JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const calculatedDates = getDatesFromToday(page);
    setDates(calculatedDates);
  }, [page]);

  const handleActiveTab = (index: number): void => {
    setActiveTabIndex(index);
  };

  return (
    <div className="h-45 relative top-4 flex items-end gap-24 md:static">
      {dates.map((date, index) => (
        <motion.div
          key={date}
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
            {date}
          </motion.span>
          <motion.span
            className="w-full border-b-2 border-solid"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: activeTabIndex === index ? 1 : 0,
              borderColor: activeTabIndex === index ? "#6500C2" : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
