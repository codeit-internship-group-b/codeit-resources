"use client";

import { useEffect, useState } from "react";
import { type IReservation } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import Sidebar from "@/components/common/Sidebar";
import { type ScheduleFormData, type Schedule, type SelectedRoom } from "@/app/types/scheduletypes";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { createReservation, updateReservation, type CreateReservationRequest } from "@/api/reservations";
import ReservationForm from "./ReservationForm";
import ReservationModal from "./ReservationModal";
import { useAuthStore } from "@/src/stores/useAuthStore";

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

  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<{
    data: CreateReservationRequest;
    itemId: string;
    reservationId?: string;
  } | null>(null);

  const isEditMode = !!selectedSchedule && selectedSchedule.user._id === user?._id;

  const createOrUpdateReservation = useMutation({
    mutationFn: (formData: { data: CreateReservationRequest; itemId: string; reservationId?: string }) => {
      if (isEditMode && formData.reservationId) {
        // 수정 모드일 경우
        return updateReservation(formData.reservationId, formData.data);
      } else {
        // 생성 모드일 경우
        return createReservation(formData.itemId, formData.data);
      }
    },
    onSuccess: async () => {
      notify({
        type: "success",
        message: isEditMode ? "예약이 수정되었습니다." : "회의실이 예약되었습니다.",
      });
      await queryClient.invalidateQueries({ queryKey: ["reservation"] });
      setIsModalOpen(false);
      onClose();
    },
  });

  const handleSubmit = (
    data: CreateReservationRequest,
    itemId: string,
    reservationId?: string, // 수정 모드일 경우 reservationId 추가
  ): void => {
    setFormData({ data, itemId, reservationId });
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
            createOrUpdateReservation.mutate(formData);
          }
          setIsModalOpen(false);
          onClose();
        }}
      />
    </div>
  );
}
