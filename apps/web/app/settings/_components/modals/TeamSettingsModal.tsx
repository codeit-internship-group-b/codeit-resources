import { useState } from "react";
import {
  SettingsModal,
  SettingsModalButton,
  SettingsModalContent,
  SettingsModalHeader,
} from "@/components/SettingsModal";
import TeamList from "@/app/admin/teams/_components/TeamList";
import ManageTeamModal from "./ManageTeamModal";

interface TeamSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamSettingsModal({ isOpen, onClose }: TeamSettingsModalProps): JSX.Element {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const handleOpenManageModal = (): void => {
    setIsManageModalOpen((prev) => !prev);
  };

  return (
    <>
      <SettingsModal isOpen={isOpen} onClose={onClose}>
        <SettingsModalHeader title="팀 관리" />
        <SettingsModalContent>
          <TeamList />
        </SettingsModalContent>
        <SettingsModalButton onClick={handleOpenManageModal}>+ 팀 추가</SettingsModalButton>
      </SettingsModal>

      <ManageTeamModal isCreate isOpen={isManageModalOpen} onClose={handleOpenManageModal} />
    </>
  );
}
