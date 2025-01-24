import ResponsiveMembersPage from "@/app/(admin)/members/_components/ResponsiveMembersPage";
import { SettingsModal, SettingsModalContent, SettingsModalHeader } from "@/components/SettingsModal";

interface MembersSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembersSettingModal({ isOpen, onClose }: MembersSettingModalProps): JSX.Element {
  return (
    <SettingsModal isOpen={isOpen} onClose={onClose} className="gap-0">
      <SettingsModalHeader title="멤버 관리" />
      <SettingsModalContent>
        <ResponsiveMembersPage />
      </SettingsModalContent>
    </SettingsModal>
  );
}
