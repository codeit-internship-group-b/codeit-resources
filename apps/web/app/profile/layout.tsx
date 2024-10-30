import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <div className="px-118 text-custom-black md:ml-200 mt-80">{children}</div>;
}
