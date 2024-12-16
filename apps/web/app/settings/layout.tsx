import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: LayoutProps): JSX.Element {
  return <section className="w-full px-16 py-36 md:p-0 md:py-80 md:pl-[318px]">{children}</section>;
}
