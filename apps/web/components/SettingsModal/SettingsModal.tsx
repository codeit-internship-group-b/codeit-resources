import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import { createContext, type ReactNode, useContext } from "react";

interface SettingsModalProps {
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

export default function SettingsModal({ onClose, children }: SettingsModalProps): JSX.Element {
  return (
    <SettingsModalContext.Provider value={{ onClose }}>
      <div className="flex h-screen w-full flex-col gap-28 px-16 pb-32 pt-36">{children}</div>
    </SettingsModalContext.Provider>
  );
}

interface SettingsModalHeaderProps {
  title: string;
}

SettingsModal.Header = function SettingsModalHeader({ title }: SettingsModalHeaderProps) {
  // TODO : 구조분해 왜 안나옴? return type 이슈?
  const { onClose } = useSettingsModal();
  return (
    <div className="flex items-center justify-center">
      <Chevron className="absolute left-16 h-40 w-40 p-10" onClick={onClose} />
      <h1 className="text-20">{title}</h1>
    </div>
  );
};

interface SettingsModalButtonProps {
  children: ReactNode;
  onClick: () => void;
}

SettingsModal.Button = function SettingsModalButton({ children, onClick }: SettingsModalButtonProps) {
  return (
    <Button
      className="absolute bottom-0 h-48 w-[calc(100%-64px)] text-base font-medium"
      variant="Primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
