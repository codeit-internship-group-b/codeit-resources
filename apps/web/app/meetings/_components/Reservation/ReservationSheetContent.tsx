import { useEffect, useState } from "react";
import { type IReservation } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import ReservationForm from "./ReservationForm";
import ReservationModal from "./ReservationModal";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import {
  createReservation,
  deleteReservation,
  updateReservation,
  type CreateReservationRequest,
} from "@/api/reservations";
import { useAuthStore } from "@/src/stores/useAuthStore";

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
  const [modalType, setModalType] = useState<"create/update" | "delete">("create/update");

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

  const deleteReservationMutation = useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    onSuccess: async () => {
      notify({
        type: "success",
        message: "예약이 삭제되었습니다.",
      });
      await queryClient.invalidateQueries({ queryKey: ["reservation"] });
      setIsModalOpen(false);
      onClose();
    },
  });

  const handleSubmit = (data: CreateReservationRequest, itemId: string, reservationId?: string): void => {
    setFormData({ data, itemId, reservationId });
    setModalType("create/update"); // 모달 타입 설정
    setIsModalOpen(true);
  };

  const handleDelete = (): void => {
    setModalType("delete"); // 모달 타입 설정
    setIsModalOpen(true);
  };

  const confirmDelete = (): void => {
    if (selectedSchedule?._id) {
      deleteReservationMutation.mutate(selectedSchedule._id);
    }
  };

  const modalTitle =
    modalType === "delete"
      ? "예약을 삭제하시겠어요?"
      : isEditMode
        ? "회의실 예약을 수정하시겠어요?"
        : "회의실을 예약하시겠어요?";

  const modalContent =
    modalType === "delete" ? (
      <>선택한 예약이 삭제됩니다.</>
    ) : isEditMode ? (
      <>선택한 시간대의 회의실 예약이 수정됩니다.</>
    ) : (
      <>선택한 시간대의 회의실이 예약됩니다.</>
    );

  const modalConfirmButtonName = modalType === "delete" ? "삭제하기" : isEditMode ? "수정하기" : "예약하기";

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
          if (modalType === "create/update") {
            if (formData) {
              createOrUpdateReservation.mutate(formData);
            }
          } else if (modalType === "delete") {
            confirmDelete();
          }
          setIsModalOpen(false);
          onClose();
        }}
        title={modalTitle}
        content={modalContent}
        cancelButtonName="취소하기"
        confirmButtonName={modalConfirmButtonName}
      />
    </>
  );
}
