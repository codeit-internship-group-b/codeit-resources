import { type ModalProps } from "@ui/src/types/ModalType";
import Button from "../Button";
import { useModalContext } from "./Root";

interface ModalCloseProps extends ModalProps {
  onConfirm?: () => void;
}

export default function ModalClose(props: ModalCloseProps): JSX.Element {
  const { children, onConfirm, className } = props;
  const { handleOpenChange } = useModalContext();

  const handleCloseClick = (): void => {
    handleOpenChange(false);
  };

  const handleConfirmClick = (): void => {
    onConfirm?.();
    handleOpenChange(false);
  };

  return (
    <div className="flex justify-end gap-10 pt-10">
      <Button
        variant="Secondary"
        className={`flex-center h-40 w-full rounded-md ${String(className)}`}
        onClick={handleCloseClick}
      >
        아니오
      </Button>
      <Button
        variant="Primary"
        className={`flex-center h-40 w-full rounded-md ${String(className)}`}
        onClick={handleConfirmClick}
      >
        {children}
      </Button>
    </div>
  );
}
