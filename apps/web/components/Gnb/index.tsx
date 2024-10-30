"use client";

import Link from "next/link";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import Profile from "../common/Profile";
import GnbMenu from "./GnbMenu";
import GnbLogo from "./GnbLogo";

export default function Gnb(): JSX.Element {
  const name = "강영훈"; // mockData
  const isAdmin = true;

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
      <Link href={PAGE_NAME.PROFILE}>
        <div className="hidden px-16 py-10 md:block">
          <Profile name={name} />
        </div>
      </Link>
    </nav>
  );
}
