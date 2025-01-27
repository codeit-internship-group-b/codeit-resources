import { Button } from "@ui/index";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import SearchForm from "./search";

interface HeaderProps {
  onMemberSelect: () => void;
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function Header({ onMemberSelect, onSearch, keyword }: HeaderProps): JSX.Element {
  return (
    <header className="my-16 flex items-center justify-between gap-20 md:mb-40 md:mt-0 md:gap-0">
      <h1 className="text-3xl-bold hidden lg:block">멤버 관리</h1>
      <div className="lg:gap-30 w-full md:flex md:justify-between lg:w-auto">
        <div className="h-54 md:h-42 md:w-[240px]">
          <SearchForm onSearch={onSearch} keyword={keyword} />
        </div>
        <Button
          onClick={onMemberSelect}
          variant="Secondary"
          className="h-42 w-122 text-lg-medium text-custom-black/80 hidden md:flex"
        >
          <div className="flex items-center gap-2">
            <span>{`+ ${MEMBER_FORM_MESSAGES.TITLE.ADD}`}</span>
          </div>
        </Button>
      </div>
    </header>
  );
}
