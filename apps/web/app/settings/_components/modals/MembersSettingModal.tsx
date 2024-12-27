import MembersContent from "@/app/admin/members/_components/MembersContent";
import { SettingsModal, SettingsModalContent, SettingsModalHeader } from "@/components/SettingsModal";

interface MembersSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembersSettingModal({ isOpen, onClose }: MembersSettingModalProps): JSX.Element {
  return (
    <SettingsModal isOpen={isOpen} onClose={onClose}>
      <SettingsModalHeader title="멤버 관리" />
      <SettingsModalContent>
        <MembersContent />
      </SettingsModalContent>
    </SettingsModal>
  );
}
