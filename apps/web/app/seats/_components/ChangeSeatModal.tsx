import { ModalAlertIcon } from "@ui/public";
import Button from "@ui/src/components/common/Button";
import ConditionalActionModal from "@ui/src/components/common/Modal/ConditionalActionModal";

interface ChangeSeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ChangeSeatModal({ isOpen, onClose, onConfirm }: ChangeSeatModalProps): JSX.Element {
  return (
    <ConditionalActionModal isOpen={isOpen} onClose={onClose}>
      <div className="min-w-343 flex flex-col items-center justify-center px-32 py-24">
        <ModalAlertIcon className="mb-12 size-28" />
        <h2 className="text-lg-medium text-custom-black pb-8">자리를 이동하시겠어요?</h2>
        <p className="text-md-regular text-custom-black/80 break-words pb-24 text-center">
          기존의 자리는 취소되며,
          <br className="md:hidden" /> 선택한 자리가 예약됩니다.
        </p>
        <div className="text-md-medium flex items-center justify-center gap-14">
          <Button
            variant="Secondary"
            className="flex-center text-custom-black/80 h-40 w-auto rounded-lg"
            onClick={onClose}
          >
            취소하기
          </Button>
          <Button variant="Primary" className="flex-center h-40 w-auto rounded-lg text-white" onClick={onConfirm}>
            이동하기
          </Button>
        </div>
      </div>
    </ConditionalActionModal>
  );
}
