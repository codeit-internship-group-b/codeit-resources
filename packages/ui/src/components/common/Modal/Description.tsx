"use client";

import { type ReactNode } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";

interface ModalDescriptionProps extends ModalProps {
  children: ReactNode;
}

export default function ModalDescription(props: ModalDescriptionProps): JSX.Element {
  const { children, className } = props;

  return (
    <p
      className={`text-md-regular text-custom-black/80 my-16 break-words px-32 text-center md:px-0 ${String(className)}`}
    >
      {children}
    </p>
  );
}
