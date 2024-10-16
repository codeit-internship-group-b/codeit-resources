"use client";

import { type ReactNode } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";

interface ModalDescriptionProps extends ModalProps {
  children: ReactNode;
}

export default function ModalDescription(props: ModalDescriptionProps): JSX.Element {
  const { children, className } = props;

  return <p className={`text-2lg-medium my-16 ${String(className)}`}>{children}</p>;
}
