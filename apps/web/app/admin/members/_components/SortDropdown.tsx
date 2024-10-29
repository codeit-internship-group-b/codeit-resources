import Dropdown from "@ui/src/components/common/Dropdown";

const sortOptions = {
  newest: "최신순",
  oldest: "오래된순",
  alphabetical: "가나다순",
} as const;

type SortOption = keyof typeof sortOptions;

interface SortDropdownProps {
  selectedSort: string | undefined;
  onSortChange: (value: string | boolean) => void;
}

export default function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps): JSX.Element {
  const getDisplayText = (value: string | undefined): string => {
    return sortOptions[value as SortOption];
  };

  return (
    <div className="bg-custom-gradient w-174 absolute right-0 top-0 flex h-full items-center justify-end pb-4">
      <Dropdown selectedValue={getDisplayText(selectedSort)} onSelect={onSortChange} size="sm">
        <Dropdown.Toggle iconType="sort">{selectedSort}</Dropdown.Toggle>
        <Dropdown.Wrapper className="right-0 mt-2">
          {Object.entries(sortOptions).map(([value, label]) => (
            <Dropdown.Item key={value} value={value} hoverStyle="purple">
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}
