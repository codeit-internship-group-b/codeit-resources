"use client";

import { type IReservation } from "@repo/types";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import DesktopReservationSheet from "./DesktopReservationSheet";
import MobileReservationSheet from "./MobileReservationSheet";

interface ReservationSheetsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string | null;
  selectedSchedule: IReservation | null;
  selectedRoom: SelectedRoom | null;
}

export default function ReservationSheets(props: ReservationSheetsProps): JSX.Element {
  const { isOpen, onClose, selectedTime, selectedSchedule, selectedRoom } = props;
  if (!selectedTime || !selectedRoom) return <div />;

  return (
    <>
      <div className="!hidden md:block">
        <DesktopReservationSheet
          onClose={onClose}
          selectedTime={selectedTime}
          selectedSchedule={selectedSchedule}
          selectedRoom={selectedRoom}
        />
      </div>

      <div className="block md:hidden">
        <MobileReservationSheet
          isOpen={isOpen}
          onClose={onClose}
          selectedTime={selectedTime}
          selectedSchedule={selectedSchedule}
          selectedRoom={selectedRoom}
        />
      </div>
    </>
  );
}
