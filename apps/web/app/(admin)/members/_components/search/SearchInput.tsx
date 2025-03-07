import { type UseFormRegister } from "react-hook-form";
import { SearchIcon, CancelIcon } from "@ui/public";

interface KeywordsFormData {
  keyword: string;
  searchHistory: string[];
}
interface SearchInputProps {
  register: UseFormRegister<KeywordsFormData>;
  keyword: string;
  onFocus: () => void;
  onClear: () => void;
}

export default function SearchInput({ register, keyword, onFocus, onClear }: SearchInputProps): JSX.Element {
  return (
    <>
      <label htmlFor="keyword">
        <SearchIcon className="transition-colors duration-200 group-focus-within:text-purple-400" />
      </label>
      <input
        id="keyword"
        className="h-18 w-full bg-transparent focus:outline-none"
        onFocus={onFocus}
        {...register("keyword")}
      />
      {keyword ? (
        <button type="button" onClick={onClear} className="flex items-center justify-center">
          <CancelIcon width="20" height="20" className="rounded-full bg-gray-200/20" />
        </button>
      ) : null}
    </>
  );
}
