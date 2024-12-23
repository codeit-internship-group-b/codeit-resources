import { SettingsModal, SettingsModalContent, SettingsModalHeader } from "@/components/SettingsModal";
import ChangePasswordForm from "../ChangePasswordForm";

interface SettingsModalsProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
}

export default function SettingsModals({ isOpen, onClose, currentTitle }: SettingsModalsProps): JSX.Element {
  return (
    <SettingsModal isOpen={isOpen} onClose={onClose}>
      <SettingsModalHeader title={currentTitle} />
      <SettingsModalContent>
        <ChangePasswordForm />
      </SettingsModalContent>
    </SettingsModal>
  );
}
