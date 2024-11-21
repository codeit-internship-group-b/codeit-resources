import { Sheet } from "react-modal-sheet";
import { type IReservation } from "@repo/types";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import ReservationSheetContent from "./ReservationSheetContent";

interface MobileReservationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  selectedRoom?: SelectedRoom | null;
}

export default function MobileReservationSheet(props: MobileReservationSheetProps): JSX.Element {
  const { isOpen, onClose, selectedTime, selectedSchedule, selectedRoom } = props;

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.8]} initialSnap={0} className="!z-50 block md:hidden">
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ReservationSheetContent
            onClose={onClose}
            selectedTime={selectedTime}
            selectedSchedule={selectedSchedule}
            selectedRoom={selectedRoom}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}
