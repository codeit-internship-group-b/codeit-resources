import { Modal } from "@ui/index";

export default function ChageSeatModal(): JSX.Element {
  return (
    <Modal.Root>
      <Modal.Trigger>삭제</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>자리를 이동하시겠어요?</Modal.Title>
        <Modal.Description>기존의 자리는 취소되며, 선택한 자리가 예약됩니다.</Modal.Description>
        <Modal.Close
          onConfirm={() => {
            // TODO: 삭제 로직 작성
          }}
          confirmText="이동하기"
          cancelText="취소하기"
        >
          예
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
