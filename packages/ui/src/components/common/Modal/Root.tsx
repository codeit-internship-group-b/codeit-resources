"use client";

import {
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { useLockBodyScroll } from "@ui/src/hooks/useLockBodyScroll";
import useEscapeKey from "../../../hooks/useEscapeKey";

export interface ModalRootProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange?: (_open: boolean) => void;
}

interface ModalContextProps extends Pick<ModalRootProps, "open"> {
  handleOpenChange: (_open: boolean) => void;
  trigger: RefObject<HTMLDivElement> | undefined;
  setTrigger: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("(!) Modal 컨텍스트를 호출할 수 없는 범위입니다.");
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

  useEscapeKey(() => {
    if (open) {
      handleOpenChange(false);
    }
  }, open);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useLockBodyScroll(Boolean(open));

  const contextValue: ModalContextProps = {
    open,
    handleOpenChange,
    setTrigger,
    trigger,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
