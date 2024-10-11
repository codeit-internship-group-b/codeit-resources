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
    <div className="w-168 flex flex-col gap-12">
      {NAV_ITEMS.map(({ href, name, icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={name} href={href}>
            <div className="flex gap-10 items-center px-16 py-8 size-full hover:bg-gray-300 rounded-10">
              <div>{icon}</div>
              <div className="text-white/60">{name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
