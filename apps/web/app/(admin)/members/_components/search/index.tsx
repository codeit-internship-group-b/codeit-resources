/* eslint-disable @typescript-eslint/no-shadow */
import { useRef, useState } from "react";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { useKeywordsForm } from "../../_hooks/useKeywordsForm";
import SearchInput from "./SearchInput";
import SearchHistoryList from "./SearchHistoryList";

interface SearchFormProps {
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function SearchForm({ onSearch, keyword }: SearchFormProps): JSX.Element {
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleOpenKeyword = (): void => {
    setIsHistoryOpen(true);
  };

  const handleCloseKeyword = (): void => {
    setIsHistoryOpen(false);
  };

  const handleSelectKeyword = (keyword: string): void => {
    setValue("keyword", keyword);
    handleCloseKeyword();
  };

  const {
    register,
    setValue,
    handleSubmit,
    handleClearInput,
    handleRemoveKeyword,
    clearAllKeywords,
    recentKeywords,
    onSubmit: searchFormSubmit,
  } = useKeywordsForm({
    onSearch,
    keyword,
    onClose: handleCloseKeyword,
  });

  useOnClickOutside(searchFormRef, handleCloseKeyword);

  return (
    <div ref={searchFormRef} className="h-54 md:h-42 relative w-full md:w-[240px]">
      <form
        onSubmit={(...args) => void handleSubmit(searchFormSubmit)(...args)}
        className="rounded-100 border-1 focus-within:border-custom-black/20 group flex h-full w-full items-center gap-14 border-gray-100/30 bg-gray-100/30 px-20 transition-all duration-200 focus-within:bg-white hover:bg-gray-100/45 focus-within:hover:bg-white"
      >
        <SearchInput
          register={register}
          setValue={setValue}
          keyword={keyword}
          onFocus={handleOpenKeyword}
          onClear={handleClearInput}
        />
      </form>

      {isHistoryOpen ? (
        <div className="absolute left-1/2 top-full z-10 mt-8 -translate-x-1/2 md:left-0 md:right-0 md:translate-x-0">
          <div className="rounded-20 shadow-search-form w-[294px] border border-gray-100 bg-white p-20 md:w-[323px]">
            <div className="mb-12 flex justify-between">
              <span className="text-md-medium text-gray-200/50">최근 검색어</span>
              {recentKeywords.length > 0 && (
                <button type="button" className="text-xs-semibold text-gray-200/50" onClick={clearAllKeywords}>
                  전체 삭제
                </button>
              )}
            </div>
            <SearchHistoryList
              keywords={recentKeywords}
              onSelect={handleSelectKeyword}
              onRemove={handleRemoveKeyword}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
