import { type ModalComponentType, type SettingsModalProps } from "@ui/src/types/ModalType";
import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  currentModal: ModalComponentType<SettingsModalProps> | null;
}

interface UseModalResult {
  isOpen: boolean;
  currentModal: ModalComponentType<SettingsModalProps> | null;
  openModal: (component: ModalComponentType<SettingsModalProps>) => void;
  closeModal: () => void;
}

export const useModal = (): UseModalResult => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentModal: null,
  });

  const openModal = (component: ModalComponentType<SettingsModalProps>): void => {
    setModalState({ isOpen: true, currentModal: component });
  };

  const closeModal = (): void => {
    setModalState({ isOpen: false, currentModal: null });
  };

  return {
    isOpen: modalState.isOpen,
    currentModal: modalState.currentModal,
    openModal,
    closeModal,
  };
};
