import { useEffect } from "react";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import Sidebar from "@/components/common/Sidebar";
import ReservationSheetContent from "./ReservationSheetContent";
import { type IReservation } from "@repo/types";
import { type SelectedRoom } from "@/app/types/scheduletypes";

interface DesktopReservationSheetProps {
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  selectedRoom?: SelectedRoom | null;
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule, selectedRoom } = props;
  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  useEffect(() => {
    if (!isSidebarOpen) {
      closeSidebar();
    }
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="hidden md:block">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          closeSidebar();
          onClose();
        }}
      >
        <ReservationSheetContent
          onClose={onClose}
          selectedTime={selectedTime}
          selectedSchedule={selectedSchedule}
          selectedRoom={selectedRoom}
        />
      </Sidebar>
    </div>
  );
}
