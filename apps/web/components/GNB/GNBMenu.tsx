"use client";

import { PersonIcon, MeetingIcon, SeatsIcon, EquipmentIcon } from "@repo/ui/public";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", name: "대시보드", icon: PersonIcon },
  { href: "/meeting-room", name: "회의실", icon: MeetingIcon },
  { href: "/seats", name: "좌석", icon: SeatsIcon },
  { href: "/equipment", name: "장비", icon: EquipmentIcon },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <menu className="w-full p-16 md:p-0 md:w-168 justify-around flex md:flex-col gap-12">
      {NAV_ITEMS.map(({ href, name, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={name} href={href}>
            <div
              className={clsx(
                "w-48 flex flex-col md:w-full md:flex-row md:gap-10 items-center md:px-16 md:py-8 size-full rounded-10",
                isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
              )}
            >
              <Icon className={clsx("md:text-white/60 stroke-current", isActive ? "text-white" : "text-white/60")} />
              <div className={clsx("md:text-white/60 md:text-16 text-12", isActive ? "text-white" : "text-white/60")}>
                {name}
              </div>
            </div>
          </Link>
        );
      })}
    </menu>
  );
}
