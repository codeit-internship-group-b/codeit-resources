import { type ReactNode } from "react";

interface SettingsModalContentProps {
  children: ReactNode;
}

export default function SettingsModalContent({ children }: SettingsModalContentProps): JSX.Element {
  return <div className="no-scrollbar scrollbar-hidden mb-48 overflow-auto">{children}</div>;
}
