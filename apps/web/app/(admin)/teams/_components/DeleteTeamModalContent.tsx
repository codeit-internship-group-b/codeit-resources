import { Modal } from "@ui/index";

interface DeleteTeamModalContentProps {
  name: string;
  onConfirm: () => void;
}

export default function DeleteTeamModalContent({ name, onConfirm }: DeleteTeamModalContentProps): JSX.Element {
  return (
    <Modal.Content>
      <Modal.Title>팀 &#39;{name}&#39;를 삭제하시겠어요?</Modal.Title>
      <Modal.Description>
        <p>해당 팀에 대한 정보가 모두 사라집니다.</p>
        <p>단, 해당 팀에 속한 멤버는 삭제되지 않습니다.</p>
      </Modal.Description>
      <Modal.Close onConfirm={onConfirm} confirmText="삭제하기" cancelText="취소하기">
        예
      </Modal.Close>
    </Modal.Content>
  );
}
