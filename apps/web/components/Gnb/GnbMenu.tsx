"use client";

import { PersonIcon, MeetingIcon, SeatsIcon, EquipmentIcon, TeamIcon } from "@repo/ui/public";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import cn from "@ui/src/utils/cn";
import useIsMobileStore from "@/app/store/useIsMobileStore";

const NAV_ITEMS = [
  { href: PAGE_NAME.DASHBOARD, name: "대시보드", icon: PersonIcon },
  { href: PAGE_NAME.MEETINGS, name: "회의실", icon: MeetingIcon },
  { href: PAGE_NAME.SEATS, name: "좌석", icon: SeatsIcon },
  { href: PAGE_NAME.EQUIPMENTS, name: "장비", icon: EquipmentIcon },
];

const ADMIN_ITEMS = [
  { href: PAGE_NAME.ADMIN_MEMBERS, name: "멤버 관리", icon: PersonIcon },
  { href: PAGE_NAME.ADMIN_TEAMS, name: "팀 관리", icon: TeamIcon },
  { href: PAGE_NAME.ADMIN_MEETINGS, name: "회의실 설정", icon: MeetingIcon },
  { href: PAGE_NAME.ADMIN_SEATS, name: "좌석 설정", icon: SeatsIcon },
  { href: PAGE_NAME.ADMIN_EQUIPMENTS, name: "장비 설정", icon: EquipmentIcon },
];

interface GnbMenuProps {
  isAdmin: boolean;
}

export default function GnbMenu({ isAdmin }: GnbMenuProps): JSX.Element {
  const pathname = usePathname();
  const isMobile = useIsMobileStore();
  const adminPathMapping = {
    [PAGE_NAME.ADMIN_MEETINGS]: PAGE_NAME.MEETINGS,
    [PAGE_NAME.ADMIN_SEATS]: PAGE_NAME.SEATS,
  };

  return (
    <menu className="md:w-168 flex w-full justify-around gap-12 p-16 md:flex-col md:p-0">
      {NAV_ITEMS.map(({ href, name, icon: Icon }) => {
        const isActive = isMobile
          ? pathname.includes(href) ||
            Object.keys(adminPathMapping).some(
              (adminPath) => pathname.startsWith(adminPath) && adminPathMapping[adminPath] === href,
            )
          : pathname === href;
        return (
          <Link key={name} href={href}>
            <div
              className={clsx(
                "rounded-10 flex size-full w-48 flex-col items-center md:w-full md:flex-row md:gap-10 md:px-16 md:py-8",
                isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
              )}
            >
              <Icon className={cn("stroke-white/60", isActive ? "stroke-white" : "stroke-white/60")} />
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
            const isActive = !isMobile && pathname.startsWith(href);
            return (
              <Link key={name} href={href} className="hidden md:block">
                <div
                  className={clsx(
                    "rounded-10 flex size-full w-48 flex-col items-center md:w-full md:flex-row md:gap-10 md:px-16 md:py-8",
                    isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
                  )}
                >
                  <Icon className={cn("stroke-white/60", isActive ? "stroke-white" : "stroke-white/60")} />
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
