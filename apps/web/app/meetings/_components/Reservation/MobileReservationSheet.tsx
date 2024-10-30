/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sheet } from "react-modal-sheet";
import { useState } from "react";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";
import ReservationForm from "./ReservationForm";
import ReservationModal from "./ReservationModal";

interface MobileReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
  selectedRoom: string;
}

export default function MobileReservationSheet({
  isOpen,
  onClose,
  selectedTime,
  selectedSchedule,
  selectedRoom,
}: MobileReservationSheetProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: ScheduleFormData): void => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.8]} initialSnap={0} className="!z-50 block md:hidden">
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <ReservationForm
              onSubmit={handleSubmit}
              selectedTime={selectedTime}
              selectedSchedule={selectedSchedule}
              selectedRoom={selectedRoom}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          onClose();
        }}
      />
    </>
  );
}
