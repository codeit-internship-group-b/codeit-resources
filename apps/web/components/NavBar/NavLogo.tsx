import { LogoCodeit, LogoText } from "@repo/ui/public";

export default function NavLogo() {
  return (
    <div className="hidden md:flex gap-8 items-center p-8 mb-10">
      <LogoCodeit width={26} height={26} />
      <LogoText width={85} height={11} />
    </div>
  );
}
