import { LogoCodeit, LogoText } from "@repo/ui/public";

export default function NavLogo() {
  return (
    <div className="mb-10 hidden items-center gap-8 p-8 md:flex">
      <LogoCodeit className="w-26 h-26" />
      <LogoText className="w-85 h-11" />
    </div>
  );
}
