import { SettingsModal, SettingsModalContent, SettingsModalHeader } from "@/components/SettingsModal";
import ChangePasswordForm from "../ChangePasswordForm";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps): JSX.Element {
  return (
    <SettingsModal isOpen={isOpen} onClose={onClose}>
      <SettingsModalHeader title="비밀번호 변경" />
      <SettingsModalContent className="mt-16">
        <ChangePasswordForm />
      </SettingsModalContent>
    </SettingsModal>
  );
}
