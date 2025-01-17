"use client";

import { PersonIcon, MeetingIcon, SeatsIcon, TeamIcon, GearIcon } from "@repo/ui/public";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import cn from "@ui/src/utils/cn";
import { Button } from "@ui/index";
import { useAppRouter } from "@/app/_hooks/useAppRouter";
import { useDetectWebView } from "@/app/_hooks/useWebView";

const NAV_ITEMS = [
  { href: PAGE_NAME.DASHBOARD, name: "대시보드", icon: PersonIcon },
  { href: PAGE_NAME.MEETINGS, name: "회의실", icon: MeetingIcon },
  { href: PAGE_NAME.SEATS, name: "좌석", icon: SeatsIcon },
  { href: PAGE_NAME.SETTINGS, name: "설정", icon: GearIcon },
];

const ADMIN_ITEMS = [
  { href: PAGE_NAME.MEMBERS, name: "멤버 관리", icon: PersonIcon },
  { href: PAGE_NAME.TEAMS, name: "팀 관리", icon: TeamIcon },
  { href: PAGE_NAME.ROOMS, name: "회의실 설정", icon: MeetingIcon },
  { href: PAGE_NAME.ADMIN_SEATS, name: "좌석 설정", icon: SeatsIcon },
];

interface GnbMenuProps {
  isAdmin: boolean;
}

export default function GnbMenu({ isAdmin }: GnbMenuProps): JSX.Element | null {
  const pathname = usePathname();
  const { push } = useAppRouter();
  const { isWebView } = useDetectWebView();

  const handleButtonClick = (path: string): void => {
    push(path);
  };

  return (
    <menu className="md:w-168 flex w-full justify-around gap-12 p-16 md:flex-col md:p-0">
      {NAV_ITEMS.map(({ href, name, icon: Icon }, index) => {
        const isActive = pathname === href;
        const iconClassName =
          Icon === GearIcon
            ? cn("fill-white/60", isActive ? "fill-white" : "fill-white/60")
            : cn("stroke-white/60", isActive ? "stroke-white" : "stroke-white/60");
        return (
          <Button
            key={name}
            as={isWebView ? "button" : Link}
            {...(isWebView
              ? {
                  type: "button",
                  onClick: () => {
                    handleButtonClick(href);
                  },
                }
              : {
                  href,
                })}
            className={cn("h-full justify-start md:h-40 md:w-full md:px-0 md:py-0", index === 3 && "block md:hidden")}
            variant="Text"
          >
            <div
              className={clsx(
                "rounded-10 md:w-168 flex w-48 flex-col items-center md:flex-row md:gap-10 md:px-16 md:py-8",
                isActive ? "md:bg-gray-300" : "md:hover:bg-gray-300",
              )}
            >
              <Icon className={iconClassName} />
              <div className={clsx("text-12 md:text-16", isActive ? "text-white" : "text-white/60")}>{name}</div>
            </div>
          </Button>
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
