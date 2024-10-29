"use client";

import { usePathname } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type ResponseType } from "@repo/types/src/responseType";
import { type IUser } from "@repo/types";
import { getUser } from "@/app/api/user";
import Profile from "../common/Profile";
import GnbMenu from "./GnbMenu";
import GnbLogo from "./GnbLogo";

export default function Gnb(): JSX.Element | null {
  const pathname = usePathname();
  // const { data } = useQuery<UseQueryResult<ResponseType<IUser>>>({
  //   queryKey: ["userData"],
  //   queryFn: (userId: string) => getUser(userId),
  // });

  const name = "강영훈"; // mockData
  const isAdmin = true;

  if (pathname === PAGE_NAME.SIGN_IN) {
    return null;
  }

  return (
    <nav
      className="md:w-200 bg-custom-black fixed bottom-0 z-50 w-screen justify-between md:flex md:h-screen md:flex-col md:p-16"
      aria-label="Navigation Bar"
    >
      <div>
        <GnbLogo />
        <hr className="hidden border-white/10 pb-10 md:block" />
        <GnbMenu isAdmin={isAdmin} />
      </div>
      <div className="hidden px-16 py-10 md:block">
        <Profile name={name} />
      </div>
    </nav>
  );
}
