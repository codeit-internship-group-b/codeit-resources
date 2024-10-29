/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Sheet } from "react-modal-sheet";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";
import ReservationForm from "./ReservationForm";

interface MobileReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
}

export default function MobileReservationSheet(props: MobileReservationSheetProps): JSX.Element {
  const { isOpen, onClose, selectedTime, selectedSchedule } = props;

  const handleSubmit = (data: ScheduleFormData): void => {
    onClose();
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.8]} initialSnap={0} className="block md:hidden">
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ReservationForm onSubmit={handleSubmit} selectedTime={selectedTime} selectedSchedule={selectedSchedule} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}
