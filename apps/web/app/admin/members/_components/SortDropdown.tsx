import Dropdown from "@ui/src/components/common/Dropdown";

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (value: string | boolean) => void;
}

const SORT_OPTIONS = ["최신순", "가나다순", "오래된순"];

export default function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps): JSX.Element {
  return (
    <div className="bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
      <Dropdown selectedValue={selectedSort} onSelect={onSortChange} size="sm">
        <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
        <Dropdown.Wrapper className="-left-34 top-32">
          {SORT_OPTIONS.map((option) => (
            <Dropdown.Item hoverStyle="purple" key={option} value={option}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}
