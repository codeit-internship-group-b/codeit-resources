"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useAuthStore } from "@/src/stores/useAuthStore";
import Profile from "../common/Profile";
import GnbMenu from "./GnbMenu";
import GnbLogo from "./GnbLogo";

export default function Gnb(): JSX.Element | null {
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuthStore();

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
        <GnbMenu isAdmin={user?.role === "admin"} />
      </div>
      {isLoggedIn ? (
        <Link
          href={PAGE_NAME.PROFILE}
          className="rounded-10 hidden px-16 py-10 hover:bg-[#3D3C40] active:bg-[#3D3C40] md:block"
          aria-label={`${user?.name}님의 프로필로 이동`}
        >
          <Profile src={user?.profileImage} name={user?.name} />
        </Link>
      ) : null}
    </nav>
  );
}
