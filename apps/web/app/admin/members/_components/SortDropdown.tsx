import Dropdown from "@ui/src/components/common/Dropdown";
import { SORT_LABELS, type SortOption } from "@repo/types/src/membersType";

interface SortDropdownProps {
  selectedSort: SortOption | undefined;
  onSortChange: (value: SortOption) => void;
}

export default function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps): JSX.Element {
  const getDisplayText = (value: SortOption | undefined): string => {
    return value ? SORT_LABELS[value] : "";
  };

  const handleSortChange = (value: string | boolean): void => {
    onSortChange(value as SortOption);
  };

  return (
    <Dropdown selectedValue={getDisplayText(selectedSort)} onSelect={handleSortChange} size="sm">
      <Dropdown.Toggle iconType="sort">{getDisplayText(selectedSort)}</Dropdown.Toggle>
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
