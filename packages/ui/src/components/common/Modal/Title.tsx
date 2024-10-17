"use client";

import { type ReactNode } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";
import { ModalAlertIcon } from "@ui/public";

interface ModalTitleProps extends ModalProps {
  children: ReactNode;
}

export default function ModalTitle(props: ModalTitleProps): JSX.Element {
  const { children, className } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <ModalAlertIcon className="mb-12 size-28" />
      <h2 className={`text-lg-medium text-custom-black ${String(className)}`}>{children}</h2>
    </div>
  );
}
