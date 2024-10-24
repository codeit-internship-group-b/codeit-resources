/* eslint-disable */
"use client";

import { Sheet } from "react-modal-sheet";
import { type Schedule } from "@/app/types/scheduletypes";

interface SnapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
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
