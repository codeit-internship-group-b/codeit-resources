import { Modal } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";

interface TeamSettingsDropdownProps {
  isModify: boolean;
  setIsModify: (value: boolean) => void;
}

export default function TeamSettingsDropdown({ isModify, setIsModify }: TeamSettingsDropdownProps): JSX.Element {
  return (
    <Modal.Root>
      <Dropdown
        selectedValue={isModify}
        onSelect={(value: string | boolean) => {
          if (value === "수정") {
            setIsModify(true);
          }
        }}
        size="sm"
      >
        <Dropdown.Toggle iconType="kebab" />
        <Dropdown.Wrapper className="-left-30 top-56">
          <Dropdown.Item hoverStyle="purple" value="수정">
            이름 편집
          </Dropdown.Item>
          <Modal.Trigger>
            <Dropdown.Item hoverStyle="purple" value="삭제">
              삭제
            </Dropdown.Item>
          </Modal.Trigger>
        </Dropdown.Wrapper>
      </Dropdown>
      <Modal.Content>
        <Modal.Title>땡땡팀을 삭제하시겠습니까?</Modal.Title>
        <Modal.Description>
          삭제 시, 해당 팀은 더 이상 목록에서 보이지 않으며,
          <br className="hidden md:block" /> 해당 계정으로 로그인이 불가합니다.
        </Modal.Description>
        <Modal.Close
          onConfirm={() => {
            // TODO: 삭제 로직 작성
          }}
          confirmText="확인"
          cancelText="취소"
        >
          예
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
