import Dropdown from "@ui/src/components/common/Dropdown";
import { SORT_LABELS, type SortOption } from "../types";

interface SortDropdownProps {
  selectedSort: SortOption | undefined;
  onSortChange: (value: string | boolean) => void;
}

export default function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps): JSX.Element {
  const getDisplayText = (value: SortOption | undefined): string => {
    return value ? SORT_LABELS[value] : "";
  };

  return (
    <Dropdown selectedValue={getDisplayText(selectedSort)} onSelect={onSortChange} size="sm">
      <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
      <Dropdown.Wrapper className="right-0 mt-2">
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <Dropdown.Item key={value} value={value} hoverStyle="purple">
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
