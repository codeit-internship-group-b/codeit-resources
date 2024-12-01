import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import SearchForm from "./search";

interface HeaderProps {
  onMemberSelect: () => void;
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function Header({ onMemberSelect, onSearch, keyword }: HeaderProps): JSX.Element {
  return (
    <header className="my-16 flex items-center justify-between gap-20 md:mb-40 md:mt-0 md:gap-0">
      <Chevron className="md:hidden" />
      <h1 className="text-3xl-bold hidden md:block">멤버 관리</h1>
      <div className="md:gap-30 relative w-full md:flex md:w-auto">
        <div className="h-54 md:h-42 relative md:w-[240px]">
          <SearchForm onSearch={onSearch} keyword={keyword} />
        </div>
        <Button
          onClick={onMemberSelect}
          variant="Secondary"
          className="w-122 h-42 text-lg-medium text-custom-black/80 hidden md:block"
        >
          + 멤버 추가
        </Button>
      </div>
    </header>
  );
}
