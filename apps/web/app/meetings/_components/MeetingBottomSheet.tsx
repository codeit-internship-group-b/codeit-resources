"use client";

import { useState } from "react";
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
        <Sheet.Content>
          <div className="p-4">
            <h2 className="text-lg font-bold">{schedule.title}</h2>
            <p>
              시간: {schedule.start} - {schedule.end}
            </p>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
