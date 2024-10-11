"use client";

import { PersonIcon, MeetingIcon, SeatsIcon, EquipmentIcon } from "@repo/ui/public";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLogo from "./NavLogo";

const NAV_ITEMS = [
  { href: "/", name: "대시보드", icon: <PersonIcon /> },
  { href: "/", name: "회의실", icon: <MeetingIcon /> },
  { href: "/", name: "좌석", icon: <SeatsIcon /> },
  { href: "/", name: "장비", icon: <EquipmentIcon /> },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="w-full p-16 md:p-0 md:w-168 justify-around flex md:flex-col gap-12">
      {NAV_ITEMS.map(({ href, name, icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={name} href={href}>
            <div className="w-48 flex flex-col md:w-full md:flex-row md:gap-10 items-center md:px-16 md:py-8 size-full md:hover:bg-gray-300 rounded-10">
              <div>{icon}</div>
              <div className="text-white/60 md:text-16 text-12">{name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
