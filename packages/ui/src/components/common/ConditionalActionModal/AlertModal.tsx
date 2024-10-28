import { type ReactNode } from "react";
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
}: AlertModalProps): JSX.Element {
  return (
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
    </BaseModal>
  );
}
