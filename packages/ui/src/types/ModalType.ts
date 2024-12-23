import { type ComponentType, type PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  className?: string;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ModalComponentType<T = unknown> = ComponentType<T>;
