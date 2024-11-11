import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import { useLockBodyScroll } from "@ui/src/hooks/useLockBodyScroll";
import { type ButtonHTMLAttributes, createContext, type ReactNode, useContext } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface SettingsModalContextProps {
  onClose: () => void;
}

const SettingsModalContext = createContext<SettingsModalContextProps | null>(null);

export const useSettingsModal = (): SettingsModalContextProps => {
  const context = useContext(SettingsModalContext);
  // throw Error 대신 빈 객체 반환으로 사용
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return context ?? { onClose: () => {} };
};

export default function SettingsModal({ isOpen, onClose, children }: SettingsModalProps): JSX.Element | null {
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  return (
    <SettingsModalContext.Provider value={{ onClose }}>
      <div className="no-scrollbar scrollbar-hidden fixed left-0 top-0 z-40 flex h-screen w-screen flex-col gap-28 overflow-hidden bg-white px-16 pb-32 pt-36">
        {children}
      </div>
    </SettingsModalContext.Provider>
  );
}
