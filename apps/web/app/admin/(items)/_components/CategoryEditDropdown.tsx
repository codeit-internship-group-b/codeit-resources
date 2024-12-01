import { Modal } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";

interface CategoryEditDropdownProps {
  isModifying?: boolean;
  onClickEdit: () => void;
}
export default function CategoryEditDropdown({ isModifying, onClickEdit }: CategoryEditDropdownProps): JSX.Element {
  return (
    <Dropdown
      selectedValue={isModifying}
      onSelect={(value: string | boolean) => {
        if (value === "수정") {
          onClickEdit();
        }
      }}
      size="sm"
    >
      <Dropdown.Toggle iconType="kebab" />
      <Dropdown.Wrapper className="-left-30 top-56">
        <Dropdown.Item hoverStyle="purple" value="수정">
          수정
        </Dropdown.Item>
        <Modal.Trigger>
          <Dropdown.Item hoverStyle="purple" value="삭제">
            삭제
          </Dropdown.Item>
        </Modal.Trigger>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
