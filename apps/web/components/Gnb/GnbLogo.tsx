import { LogoCodeitIcon, LogoTextIcon } from "@repo/ui/public";

export default function GnbLogo(): JSX.Element {
  return (
    <div className="mb-10 hidden items-center gap-8 p-8 md:flex">
      <LogoCodeitIcon className="w-26 h-26" />
      <LogoTextIcon className="w-85 h-11 fill-white" />
    </div>
  );
}
