import Profile from "../common/Profile";
import NavMenu from "./NavMenu";
import NavLogo from "./NavLogo";

export default function NavBar() {
  return (
    <nav
      className="flex flex-col justify-between w-200 h-screen p-16 fixed z-50 bg-custom-black"
      aria-label="Navigation Bar"
    >
      <div>
        <NavLogo />
        <hr className="border-white/10 pb-10" />
        <NavMenu />
      </div>
      <div className="py-10 px-16">
        <Profile name="강영훈" />
      </div>
    </nav>
  );
}
