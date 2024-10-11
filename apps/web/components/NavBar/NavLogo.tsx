import { LogoCodeit, LogoText } from "@repo/ui/public";

export default function NavLogo() {
  return (
    <div className="flex gap-8 items-center pb-10">
      <LogoCodeit width={26} height={26} />
      <LogoText width={85} height={11} />
    </div>
  );
}
