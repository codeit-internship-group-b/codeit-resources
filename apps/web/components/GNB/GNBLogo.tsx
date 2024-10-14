import { LogoCodeit, LogoText } from "@repo/ui/public";

export default function NavLogo() {
  return (
    <div className="hidden md:flex gap-8 items-center p-8 mb-10">
      <LogoCodeit className="w-26 h-26" />
      <LogoText className="w-85 h-11" />
    </div>
  );
}
