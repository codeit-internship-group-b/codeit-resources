import Dropdown from "@ui/src/components/common/Dropdown";
import { SORT_OPTIONS } from "@repo/ui/src/utils/constants/sortOptions";

interface SortDropdownProps {
  selectedSort: string | undefined;
  onSortChange: (value: string | boolean) => void;
}

export default function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps): JSX.Element {
  return (
    <div className="bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
      <Dropdown selectedValue={selectedSort} onSelect={onSortChange} size="sm">
        <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
        <Dropdown.Wrapper className="right-0 mt-2">
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
