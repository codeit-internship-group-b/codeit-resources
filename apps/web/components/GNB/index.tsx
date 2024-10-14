"use client";

import Profile from "../common/Profile";
import GNBMenu from "./GNBMenu";
import GNBLogo from "./GNBLogo";

export default function GNB() {
  const name = "강영훈"; // mockData
  return (
    <nav
      className="bottom-0 w-screen md:flex md:flex-col justify-between md:w-200 md:h-screen md:p-16 fixed z-50 bg-custom-black"
      aria-label="Navigation Bar"
    >
      <div>
        <GNBLogo />
        <hr className="border-white/10 pb-10 hidden md:block" />
        <GNBMenu />
      </div>
      <div className="py-10 px-16 hidden md:block">
        <Profile name={name} />
      </div>
    </nav>
  );
}
