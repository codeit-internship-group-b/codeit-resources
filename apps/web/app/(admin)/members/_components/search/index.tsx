import { useRef, useState } from "react";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { SEARCH } from "@repo/constants/messages";
import { useForm } from "react-hook-form";
import { storage } from "@ui/src/utils/storage";
import SearchInput from "./SearchInput";
import SearchHistoryList from "./SearchHistoryList";

export interface KeywordsFormData {
  keyword: string;
  searchHistory: string[];
}
interface SearchFormProps {
  onSearch: (keyword: string) => void;
  keyword: string;
}

export default function SearchForm({ onSearch, keyword }: SearchFormProps): JSX.Element {
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { register, setValue, watch, handleSubmit } = useForm<KeywordsFormData>({
    defaultValues: {
      keyword: "",
      searchHistory: [],
    },
  });

  const searchHistory = watch("searchHistory");

  const saveSearchHistory = (keywords: string[]): void => {
    setValue("searchHistory", keywords);
    storage.set<string[]>("searchHistory", keywords);
  };

  const handleClearInput = (): void => {
    setValue("keyword", "");
  };

  const handleRemovekeyword = (keywordToRemove: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const updatedKeywords = searchHistory.filter((keyword) => keyword !== keywordToRemove);

    saveSearchHistory(updatedKeywords);
  };

  const handleRemoveAllKeywords = (): void => {
    saveSearchHistory([]);
    handleCloseHistory();
  };

  const handleOpenHistory = (): void => {
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = (): void => {
    setIsHistoryOpen(false);
  };

  const handleSelectKeyword = (selectedKeyword: string): void => {
    setValue("keyword", selectedKeyword);
    handleCloseHistory();
  };

  const onSubmit = (formData: KeywordsFormData): void => {
    const trimmedKeyword = formData.keyword.trim();

    if (!trimmedKeyword) return;

    const updatedKeywords = [
      trimmedKeyword,
      ...searchHistory.filter((existingKeyword) => existingKeyword !== trimmedKeyword),
    ].slice(0, 5);

    saveSearchHistory(updatedKeywords);
    onSearch(trimmedKeyword);
    handleCloseHistory();
  };

  useOnClickOutside(searchFormRef, handleCloseHistory);

  return (
    <div ref={searchFormRef} className="h-54 md:h-42 relative w-full md:w-[240px]">
      <form
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        className="rounded-100 border-1 focus-within:border-custom-black/20 group flex h-full w-full items-center gap-14 border-gray-100/30 bg-gray-100/30 px-20 transition-all duration-200 focus-within:bg-white hover:bg-gray-100/45 focus-within:hover:bg-white"
      >
        <SearchInput
          register={register}
          setValue={setValue}
          keyword={keyword}
          onFocus={handleOpenHistory}
          onClear={handleClearInput}
        />
      </form>

      {isHistoryOpen ? (
        <div className="absolute left-1/2 top-full z-10 mt-8 -translate-x-1/2 md:left-0 md:right-0 md:translate-x-0">
          <div className="rounded-20 shadow-search-form w-[294px] border border-gray-100 bg-white p-20 md:w-[323px]">
            <div className="mb-12 flex justify-between">
              <span className="text-md-medium text-gray-200/50">{SEARCH.LABEL.RECENT}</span>
              {searchHistory.length > 0 && (
                <button type="button" className="text-xs-semibold text-gray-200/50" onClick={handleRemoveAllKeywords}>
                  {SEARCH.LABEL.REMOVE_ALL}
                </button>
              )}
            </div>
            <SearchHistoryList keywords={searchHistory} onSelect={handleSelectKeyword} onRemove={handleRemovekeyword} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
