/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

"use client";

import { useState } from "react";
import { type IReservation } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import {
  createReservation,
  deleteReservation,
  updateReservation,
  type CreateReservationRequest,
} from "@/api/reservations";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { useDateStore } from "@/app/store/useDateStore";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { formatDate } from "@/app/utils/formatDate";
import { MODAL_TEXT, ModalType, NOTIFICATION_MESSAGES, QUERY_KEYS } from "@/app/constants/reservationConstants";
import ReservationModal from "./ReservationModal";
import { ReservationForm } from "./ReservationForm";

interface ReservationSheetContentProps {
  onClose: () => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  selectedRoom?: SelectedRoom | null;
}

export default function ReservationSheetContent(props: ReservationSheetContentProps): JSX.Element {
  const { onClose, selectedTime, selectedSchedule, selectedRoom } = props;
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.CREATE_UPDATE);

  const user = useAuthStore((state) => state.user);
  const { selectedDate } = useDateStore();

  const formattedDate = formatDate(selectedDate);

  const [formData, setFormData] = useState<{
    data: CreateReservationRequest;
    itemId: string;
    reservationId?: string;
  } | null>(null);

  const isEditMode = selectedSchedule && selectedSchedule.user._id === user?._id;

  const createOrUpdateReservation = useMutation({
    mutationFn: (formData: { data: CreateReservationRequest; itemId: string; reservationId?: string }) => {
      if (isEditMode && formData.reservationId) {
        // 수정 모드일 경우
        return updateReservation(formData.reservationId, formData.data);
      }
      // 생성 모드일 경우
      return createReservation(formData.itemId, formData.data);
    },
    onSuccess: async () => {
      notify({
        type: "success",
        message: isEditMode ? NOTIFICATION_MESSAGES.update : NOTIFICATION_MESSAGES.create,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.meetings(formattedDate, MEETING_ROOMS_TYPE),
      });
      setIsModalOpen(false);
      onClose();
    },
  });

  const deleteReservationMutation = useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    onSuccess: async () => {
      notify({
        type: "success",
        message: NOTIFICATION_MESSAGES.delete,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.meetings(formattedDate, MEETING_ROOMS_TYPE),
      });
      setIsModalOpen(false);
      onClose();
    },
  });

  const handleSubmit = (data: CreateReservationRequest, itemId: string, reservationId?: string): void => {
    setFormData({ data, itemId, reservationId });
    setModalType(isEditMode ? ModalType.CREATE_UPDATE : ModalType.CREATE_UPDATE); // 동일하게 설정, 추후 수정 가능
    setIsModalOpen(true);
  };

  const handleDelete = (): void => {
    setModalType(ModalType.DELETE);
    setIsModalOpen(true);
  };

  const confirmDelete = (): void => {
    if (selectedSchedule?._id) {
      deleteReservationMutation.mutate(selectedSchedule._id);
    }
  };

  const modalTitle = isEditMode ? MODAL_TEXT.titles.edit : MODAL_TEXT.titles[modalType];

  const modalContent = isEditMode ? MODAL_TEXT.contents.edit : MODAL_TEXT.contents[modalType];

  const modalConfirmButtonName = isEditMode
    ? MODAL_TEXT.confirmButtonNames.edit
    : MODAL_TEXT.confirmButtonNames[modalType];

  return (
    <>
      <ReservationForm
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        selectedTime={selectedTime}
        selectedSchedule={selectedSchedule}
        selectedRoom={selectedRoom}
      />
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          if (modalType === ModalType.CREATE_UPDATE) {
            if (formData) {
              createOrUpdateReservation.mutate(formData);
            }
          } else if (modalType === ModalType.DELETE) {
            confirmDelete();
          }
          setIsModalOpen(false);
          onClose();
        }}
        title={modalTitle}
        content={modalContent}
        cancelButtonName={MODAL_TEXT.cancelButtonName}
        confirmButtonName={modalConfirmButtonName}
      />
    </>
  );
}
