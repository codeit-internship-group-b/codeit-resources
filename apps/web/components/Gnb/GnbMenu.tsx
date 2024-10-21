"use client";

import { PersonIcon, MeetingIcon, SeatsIcon, EquipmentIcon, TeamIcon } from "@repo/ui/public";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", name: "대시보드", icon: PersonIcon },
  { href: "/meetings", name: "회의실", icon: MeetingIcon },
  { href: "/seats", name: "좌석", icon: SeatsIcon },
  { href: "/equipments", name: "장비", icon: EquipmentIcon },
];

const ADMIN_ITEMS = [
  { href: "/admin/members", name: "멤버 관리", icon: PersonIcon },
  { href: "/admin/teams", name: "팀 관리", icon: TeamIcon },
  { href: "/admin/meetings", name: "회의실 설정", icon: MeetingIcon },
  { href: "/admin/seats", name: "좌석 설정", icon: SeatsIcon },
  { href: "/admin/equipments", name: "장비 설정", icon: EquipmentIcon },
];

interface GnbMenuProps {
  isAdmin: boolean;
}

export default function GnbMenu({ isAdmin }: GnbMenuProps): JSX.Element {
  const pathname = usePathname();

  return (
    <menu className="md:w-168 flex w-full justify-around gap-12 p-16 md:flex-col md:p-0">
      {NAV_ITEMS.map(({ href, name, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link key={name} href={href}>
            <div
              className={clsx(
                "rounded-10 flex size-full w-48 flex-col items-center md:w-full md:flex-row md:gap-10 md:px-16 md:py-8",
                isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
              )}
            >
              <Icon className={clsx("stroke-white/60", isActive ? "text-white" : "stroke-white/60")} />
              <div className={clsx("text-12 md:text-16", isActive ? "text-white" : "text-white/60")}>{name}</div>
            </div>
          </Link>
        );
      })}
      {isAdmin ? (
        <>
          <hr className="hidden border-white/10 pb-10 md:block" />
          <div className="text-sm-bold hidden px-16 pt-8 text-white/30 md:block">어드민 기능</div>
          {ADMIN_ITEMS.map(({ href, name, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={name} href={href} className="hidden md:block">
                <div
                  className={clsx(
                    "rounded-10 flex size-full w-48 flex-col items-center md:w-full md:flex-row md:gap-10 md:px-16 md:py-8",
                    isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
                  )}
                >
                  <Icon className={clsx("stroke-white/60", isActive ? "stroke-white" : "stroke-white/60")} />
                  <div className={clsx("md:text-16 text-12", isActive ? "text-white" : "text-white/60")}>{name}</div>
                </div>
              </Link>
            );
          })}
        </>
      ) : null}
    </menu>
  );
}
