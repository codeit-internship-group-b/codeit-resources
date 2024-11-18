"use client";

import { useEffect, useState } from "react";
import { type IReservation } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule, type SelectedRoom } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { createReservation, type CreateReservationRequest } from "@/api/reservations";
import ReservationForm from "./ReservationForm";
import ReservationModal from "./ReservationModal";

interface DesktopReservationSheetProps {
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  selectedRoom?: SelectedRoom | null;
}

export default function DesktopReservationSheet(props: DesktopReservationSheetProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule, selectedRoom } = props;
  const queryClient = useQueryClient();
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<{ data: CreateReservationRequest; itemId: string } | null>(null);

  // Reservation mutation 설정
  const createReservationMutation = useMutation({
    mutationFn: (formData: { data: CreateReservationRequest; itemId: string }) => {
      // ScheduleFormData를 CreateReservationRequest 형식으로 변환

      return createReservation(formData.itemId, formData.data);
    },
    onSuccess: async () => {
      notify({
        type: "success",
        message: "회의실 예약이 다다다다다.",
      });
      await queryClient.invalidateQueries({ queryKey: ["reservation"] });
      setIsModalOpen(false);
      onClose();
    },
  });

  const handleSubmit = (data: CreateReservationRequest, itemId: string): void => {
    setFormData({ data, itemId });
    setIsModalOpen(true);
  };

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
        <ReservationForm
          onSubmit={handleSubmit}
          selectedTime={selectedTime}
          selectedSchedule={selectedSchedule}
          selectedRoom={selectedRoom}
        />
      </Sidebar>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          if (formData) {
            createReservationMutation.mutate(formData);
          }
          setIsModalOpen(false);
          onClose();
        }}
      />
    </div>
  );
}
