import { type ReactNode } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";

interface ModalTitleProps extends ModalProps {
  children: ReactNode;
}

export default function ModalTitle(props: ModalTitleProps): JSX.Element {
  const { children, className } = props;
  return <h2 className={`text-2xl-bold ${String(className)}`}>{children}</h2>;
}
