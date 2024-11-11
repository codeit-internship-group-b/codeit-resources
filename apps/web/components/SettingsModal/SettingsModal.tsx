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

const useSettingsModal = (): SettingsModalContextProps => {
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

interface SettingsModalHeaderProps {
  title: string;
  actions?: ReactNode;
}

SettingsModal.Header = function SettingsModalHeader({ title, actions }: SettingsModalHeaderProps): JSX.Element {
  const { onClose } = useSettingsModal();

  return (
    <div className="relative flex items-center justify-center">
      <Chevron className="absolute left-16 h-40 w-40 p-10" onClick={onClose} />
      <h1 className="text-20">{title}</h1>
      {actions ? <div className="absolute right-0 top-0">{actions}</div> : null}
    </div>
  );
};

interface SettingsModalContentProps {
  children: ReactNode;
}

SettingsModal.Content = function SettingsModalContent({ children }: SettingsModalContentProps) {
  return <div className="no-scrollbar scrollbar-hidden mb-48 overflow-auto">{children}</div>;
};

interface SettingsModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

SettingsModal.Button = function SettingsModalButton({ children, ...rest }: SettingsModalButtonProps) {
  return (
    <Button className="fixed bottom-32 h-48 w-[calc(100%-32px)] text-base font-medium" variant="Primary" {...rest}>
      {children}
    </Button>
  );
};
