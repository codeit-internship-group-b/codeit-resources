"use client";

import Profile from "../common/Profile";
import GnbMenu from "./GnbMenu";
import GnbLogo from "./GnbLogo";

export default function Gnb(): JSX.Element {
  const name = "강영훈"; // mockData
  const isAdmin = true;
  return (
    <nav
      className="bottom-0 w-screen md:flex md:flex-col justify-between md:w-200 md:h-screen md:p-16 fixed z-50 bg-custom-black"
      aria-label="Navigation Bar"
    >
      <div>
        <GnbLogo />
        <hr className="border-white/10 pb-10 hidden md:block" />
        <GnbMenu isAdmin={isAdmin} />
      </div>
      <div className="py-10 px-16 hidden md:block">
        <Profile name={name} />
      </div>
    </nav>
  );
}
