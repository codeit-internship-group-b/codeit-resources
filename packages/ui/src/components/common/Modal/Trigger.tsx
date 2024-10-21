"use client";

import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode, useEffect, useRef } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";
import { useModalContext } from "./Root";

export interface ModalTriggerProps
  extends Omit<ModalProps, "children">,
    Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  disabled?: boolean;
  children: ReactNode;
}

export default function ModalTrigger(props: ModalTriggerProps): JSX.Element {
  const { children, className, disabled, ...divElementProps } = props;
  const { open: currentOpenState, handleOpenChange, setTrigger } = useModalContext();
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickTrigger = (): void => {
    if (disabled) {
      return; // disabled일 경우 클릭 무시
    }
    handleOpenChange(!currentOpenState);
  };

  useEffect(() => {
    if (triggerRef.current) {
      setTrigger(triggerRef);
    }
  }, [setTrigger]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div {...divElementProps} onClick={handleClickTrigger} ref={triggerRef} className={className}>
      {children}
    </div>
  );
}
