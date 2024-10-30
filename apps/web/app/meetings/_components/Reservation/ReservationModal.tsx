"use client";

import AlertModal from "@ui/src/components/common/ConditionalActionModal/AlertModal";
import { notify } from "@ui/index";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReservationModal({ isOpen, onClose, onConfirm }: ReservationModalProps): JSX.Element {
  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onConfirm();
        notify({ type: "success", message: "회의실이 예약되었습니다!" });
      }}
      title="회의실을 예약하시겠어요?"
      content={<>선택한 시간대의 회의실이 예약됩니다.</>}
      cancelButtonName="취소하기"
      confirmButtonName="예약하기"
    />
  );
}
