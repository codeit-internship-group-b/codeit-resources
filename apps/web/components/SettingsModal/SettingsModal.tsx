import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
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
  if (!isOpen) return null;

  return (
    <SettingsModalContext.Provider value={{ onClose }}>
      <div className="absolute left-0 top-0 z-50 flex h-screen w-screen flex-col gap-28 bg-white px-16 pb-32 pt-36">
        {children}
      </div>
    </SettingsModalContext.Provider>
  );
}

interface SettingsModalHeaderProps {
  title: string;
}

SettingsModal.Header = function SettingsModalHeader({ title }: SettingsModalHeaderProps) {
  const { onClose } = useSettingsModal();
  return (
    <div className="flex items-center justify-center">
      <Chevron className="absolute left-16 h-40 w-40 p-10" onClick={onClose} />
      <h1 className="text-20">{title}</h1>
    </div>
  );
};

interface SettingsModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

SettingsModal.Button = function SettingsModalButton({ children, ...rest }: SettingsModalButtonProps) {
  return (
    <Button className="absolute bottom-32 h-48 w-[calc(100%-32px)] text-base font-medium" variant="Primary" {...rest}>
      {children}
    </Button>
  );
};
