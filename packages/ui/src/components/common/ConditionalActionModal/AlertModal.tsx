import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalAlertIcon } from "@ui/public";
import Button from "@ui/src/components/common/Button";
import { BaseModal } from "./BaseModal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  cancelButtonName: string;
  confirmButtonName: string;
  onConfirm: () => void;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  cancelButtonName,
  confirmButtonName,
}: AlertModalProps): JSX.Element | null {
  useEffect(() => {
    // 모달이 열릴 때 스크롤 막기
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트가 언마운트될 때 스크롤 복원
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="min-w-343 flex flex-col items-center justify-center px-32 py-24">
        <ModalAlertIcon className="mb-12 size-28" />
        <h2 className="text-lg-medium text-custom-black pb-8">{title}</h2>
        <p className="text-md-regular text-custom-black/80 break-words pb-24 text-center">{content}</p>
        <div className="text-md-medium flex items-center justify-center gap-14">
          <Button
            variant="Secondary"
            className="flex-center text-custom-black/80 h-40 w-auto rounded-lg"
            onClick={onClose}
          >
            {cancelButtonName}
          </Button>
          <Button variant="Primary" className="flex-center h-40 w-auto rounded-lg text-white" onClick={onConfirm}>
            {confirmButtonName}
          </Button>
        </div>
      </div>
    </BaseModal>,
    document.body, // 포탈 렌더링 노드
  );
}
