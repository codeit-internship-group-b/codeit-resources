"use client";

import AlertModal from "@ui/src/components/common/ConditionalActionModal/AlertModal";
import { type ReactNode } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string; // 추가
  content: ReactNode; // 추가
  cancelButtonName: string; // 추가
  confirmButtonName: string; // 추가
}

export default function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  cancelButtonName,
  confirmButtonName,
}: ReservationModalProps): JSX.Element {
  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onConfirm();
      }}
      title={title}
      content={content}
      cancelButtonName={cancelButtonName}
      confirmButtonName={confirmButtonName}
    />
  );
}
