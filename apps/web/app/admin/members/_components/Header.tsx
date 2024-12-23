import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import SearchForm from "./SearchForm";

interface HeaderProps {
  onMemberSelect: () => void;
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function Header({ onMemberSelect, onSearch, keyword }: HeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between gap-20 my-16 md:mb-40 md:mt-0 md:gap-0">
      <Chevron className="md:hidden" />
      <h1 className="hidden text-3xl-bold md:block">멤버 관리</h1>
      <div className="relative w-full md:gap-30 md:flex md:w-auto">
        <div className="h-54 md:h-42 relative md:w-[240px]">
          <SearchForm onSearch={onSearch} keyword={keyword} />
        </div>
        <Button
          onClick={onMemberSelect}
          variant="Secondary"
          className="hidden w-122 h-42 text-lg-medium text-custom-black/80 md:block"
        >
          + 멤버 추가
        </Button>
      </div>
    </header>
  );
}
