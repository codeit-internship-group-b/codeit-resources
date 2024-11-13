import { useState } from "react";
import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import { type SortOption, SORT_OPTIONS } from "@repo/types/src/membersType";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import SortDropdown from "./SortDropdown";

interface HeaderProps {
  onSortChange: (sort: SortOption) => void;
  onMemberSelect: () => void;
}

export default function Header({ onSortChange, onMemberSelect }: HeaderProps): JSX.Element {
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS.NEWEST);

  const isMobile = useIsMobileStore();

  const handleSortChange = (value: string | boolean): void => {
    const newSort = value as SortOption;
    setSelectedSort(newSort);
    onSortChange(newSort);
  };

  const triggerError = () => {
    const errorSort = "ERROR" as SortOption;
    setSelectedSort(errorSort);
    onSortChange(errorSort);
  };

  return (
    <>
      {isMobile ? (
        <header className="mb-28 flex items-center justify-between">
          <Chevron />
          <h1 className="text-xl-bold">멤버 관리</h1>
          <SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
        </header>
      ) : (
        <header className="mb-40 flex justify-between">
          <h1 className="text-3xl-bold">멤버 관리</h1>
          <button onClick={triggerError}>에러 발생</button>
          <Button
            onClick={onMemberSelect}
            variant="Secondary"
            className="w-122 h-42 text-lg-medium text-custom-black/80"
          >
            + 멤버 추가
          </Button>
        </header>
      )}
    </>
  );
}
