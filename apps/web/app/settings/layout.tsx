import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: LayoutProps): JSX.Element {
  return <section>{children}</section>;
}
