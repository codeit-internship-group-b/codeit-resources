"use client";

import {
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface ModalRootProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalContextProps extends Pick<ModalRootProps, "open"> {
  handleOpenChange: (open: boolean) => void;
  trigger: RefObject<HTMLDivElement> | undefined;
  setTrigger: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("(!) Modal 컨텍스트를 호출할 수 없는 범위 입니다.");
  }
  return context;
};

export default function ModalRoot(props: ModalRootProps): JSX.Element {
  const { children, open: openProp = false, onOpenChange } = props;
  const [open, setOpen] = useState<boolean>(openProp);
  const [trigger, setTrigger] = useState<RefObject<HTMLDivElement> | undefined>();

  const handleOpenChange = useCallback(
    (currentOpen: boolean): void => {
      setOpen(currentOpen);
      onOpenChange?.(currentOpen);
    },
    [onOpenChange],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && open) {
        handleOpenChange(false); // 엔터 키를 눌렀을 때 모달 닫기
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleOpenChange]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const contextValue: ModalContextProps = {
    open,
    handleOpenChange,
    setTrigger,
    trigger,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
