import { Button } from "@ui/index";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface SettingsModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function SettingsModalButton({ children, ...rest }: SettingsModalButtonProps): JSX.Element {
  return (
    <Button className="fixed bottom-32 h-48 w-[calc(100%-32px)] text-base font-medium" variant="Primary" {...rest}>
      {children}
    </Button>
  );
}
