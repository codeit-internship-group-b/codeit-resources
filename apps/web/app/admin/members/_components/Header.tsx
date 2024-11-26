import { Button } from "@ui/index";
import { Chevron } from "@ui/public";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import SearchForm from "./SearchForm";

interface HeaderProps {
  onMemberSelect: () => void;
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function Header({ onMemberSelect, onSearch, keyword }: HeaderProps): JSX.Element {
  const isMobile = useIsMobileStore();

  return (
    <>
      {isMobile ? (
        <header className="my-16 flex items-center justify-between gap-20">
          <Chevron />
          <div className="h-54 relative w-full">
            <SearchForm onSearch={onSearch} keyword={keyword} />
          </div>
        </header>
      ) : (
        <header className="mb-40 flex justify-between">
          <h1 className="text-3xl-bold">멤버 관리</h1>
          <div className="gap-30 flex justify-between">
            <div className="h-42 relative w-[240px]">
              <SearchForm onSearch={onSearch} keyword={keyword} />
            </div>
            <Button
              onClick={onMemberSelect}
              variant="Secondary"
              className="w-122 h-42 text-lg-medium text-custom-black/80"
            >
              + 멤버 추가
            </Button>
          </div>
        </header>
      )}
    </>
  );
}
