import { type ReactNode, type PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  className?: string;
  children?: ReactNode;
}
