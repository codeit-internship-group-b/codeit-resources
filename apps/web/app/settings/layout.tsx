import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: LayoutProps): JSX.Element {
  return <section className="w-full py-36 pl-16 pr-16 md:py-80 md:pl-[318px]">{children}</section>;
}
