"use client";

import { usePathname } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type IUser } from "@repo/types";
import { type AxiosError } from "axios";
import Link from "next/link";
import { getUser } from "@/app/api/users";
import Profile from "../common/Profile";
import GnbMenu from "./GnbMenu";
import GnbLogo from "./GnbLogo";

export default function Gnb(): JSX.Element | null {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const cachedUserData = queryClient.getQueryData<IUser>(["userData"]);

  const { data: userResponse } = useQuery<IUser, AxiosError<{ message?: string }>>({
    queryKey: ["userData", { userId: cachedUserData?._id }],
    queryFn: () => getUser(cachedUserData?._id ?? ""),
    enabled: Boolean(cachedUserData?._id),
  });

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
        <GnbMenu isAdmin={userResponse?.role === "admin"} />
      </div>
      <Link href={PAGE_NAME.PROFILE} className="hidden px-16 py-10 md:block">
        <Profile name={userResponse?.name} />
      </Link>
    </nav>
  );
}
