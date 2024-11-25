"use client";

import { type ReactNode } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";

interface ModalDescriptionProps extends ModalProps {
  children: ReactNode;
}

export default function ModalDescription(props: ModalDescriptionProps): JSX.Element {
  const { children, className } = props;

  return (
    <p className={`text-md-regular text-custom-black/80 my-16 break-words text-center ${String(className)}`}>
      {children}
    </p>
  );
}
