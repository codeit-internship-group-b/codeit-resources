import { useState } from "react";
import SettingsModal from "@/components/SettingsModal/SettingsModal";
import TeamList from "./TeamList";
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
        <SettingsModal.Header title="팀 관리" />
        <TeamList />
        <SettingsModal.Button onClick={handleOpenManageModal}>+ 팀 추가</SettingsModal.Button>
      </SettingsModal>

      <ManageTeamModal isCreate isOpen={isManageModalOpen} onClose={handleOpenManageModal} />
    </>
  );
}
