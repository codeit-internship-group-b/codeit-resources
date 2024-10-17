"use client";

import { type ModalProps } from "@ui/src/types/ModalType";
import Button from "../Button";
import { useModalContext } from "./Root";

interface ModalCloseProps extends ModalProps {
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ModalClose(props: ModalCloseProps): JSX.Element {
  const { onConfirm, confirmText = "예", cancelText = "아니오", className } = props;
  const { handleOpenChange } = useModalContext();

  const handleCloseClick = (): void => {
    handleOpenChange(false);
  };

  const handleConfirmClick = (): void => {
    onConfirm?.();
    handleOpenChange(false);
  };

  return (
    <div className="text-md-medium flex items-center justify-center gap-14">
      <Button
        variant="Secondary"
        className={`flex-center text-custom-black/80 h-40 w-auto rounded-lg ${String(className)}`}
        onClick={handleCloseClick}
      >
        {cancelText}
      </Button>
      <Button
        variant="Primary"
        className={`flex-center h-40 w-auto rounded-lg text-white ${String(className)}`}
        onClick={handleConfirmClick}
      >
        {confirmText}
      </Button>
    </div>
  );
}
