import { Modal } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { type Dispatch } from "react";

interface CategoryEditDropdownProps {
  isModifying: boolean;
  setIsModifying: Dispatch<React.SetStateAction<boolean>>;
}
export default function CategoryEditDropdown({ isModifying, setIsModifying }: CategoryEditDropdownProps): JSX.Element {
  return (
    <Dropdown
      selectedValue={isModifying}
      onSelect={(value: string | boolean) => {
        if (value === "수정") {
          setIsModifying(true);
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
  );
}
