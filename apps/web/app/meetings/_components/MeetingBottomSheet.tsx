"use client";

import { Sheet } from "react-modal-sheet";

interface SnapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: {
    title: string;
    start: string;
    end: string;
  };
}

export const MeetingBottomSheet: React.FC<SnapSheetProps> = ({ isOpen, onClose, schedule }) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{schedule.title}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
