"use client";

import Profile from "../common/Profile";
import GNBMenu from "./GNBMenu";
import GNBLogo from "./GNBLogo";

export default function GNB() {
  const name = "강영훈"; // mockData
  const isAdmin = true;
  return (
    <nav
      className="md:w-200 bg-custom-black fixed bottom-0 z-50 w-screen justify-between md:flex md:h-screen md:flex-col md:p-16"
      aria-label="Navigation Bar"
    >
      <div>
        <GNBLogo />
        <hr className="hidden border-white/10 pb-10 md:block" />
        <GNBMenu isAdmin={isAdmin} />
      </div>
      <div className="hidden px-16 py-10 md:block">
        <Profile name={name} />
      </div>
    </nav>
  );
}
