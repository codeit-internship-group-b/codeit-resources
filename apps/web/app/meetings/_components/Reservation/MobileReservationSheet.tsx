// components/MeetingBottomSheet.tsx

"use client";

import { Sheet } from "react-modal-sheet";
import { ReservationForm } from "./ReservationForm";

interface MobileReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
}

export const MobileReservationSheet: React.FC<MobileReservationSheetProps> = ({ isOpen, onClose, selectedTime }) => {
  const handleSubmit = (data: any) => {
    console.log("Reservation Data:", data);
    onClose();
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.8]} initialSnap={0} className="block md:hidden">
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ReservationForm onSubmit={handleSubmit} selectedTime={selectedTime} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
