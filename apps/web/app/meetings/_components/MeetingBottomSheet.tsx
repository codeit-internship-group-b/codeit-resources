"use client";

import { Sheet } from "react-modal-sheet";

interface SnapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: {
    id: string;
    date: string;
    start_time: string; // HH:mm 형식
    end_time: string; // HH:mm 형식
    title: string;
    userId: string;
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
