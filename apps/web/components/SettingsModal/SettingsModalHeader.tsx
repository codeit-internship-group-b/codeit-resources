import { Chevron } from "@ui/public";
import { type ReactNode } from "react";
import { useSettingsModal } from "./SettingsModal";

interface SettingsModalHeaderProps {
  title: string;
  actions?: ReactNode;
}

export default function SettingsModalHeader({ title, actions }: SettingsModalHeaderProps): JSX.Element {
  const { onClose } = useSettingsModal();

  return (
    <div className="relative flex items-center justify-center">
      <Chevron className="absolute left-0 h-40 w-40 p-10" onClick={onClose} />
      <h1 className="text-20">{title}</h1>
      {actions ? <div className="absolute right-0 top-0">{actions}</div> : null}
    </div>
  );
}
