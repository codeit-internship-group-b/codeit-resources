import { type ChangeEvent } from "react";
import { type UseFormSetValue, type UseFormRegister } from "react-hook-form";
import { SearchIcon, CancelIcon } from "@ui/public";
import { type KeywordsFormData } from "@repo/types/src/searchFormType";
import { useDebouncedCallback } from "@/app/(admin)/teams/_hooks/useDebounceCallback";

interface SearchInputProps {
  register: UseFormRegister<KeywordsFormData>;
  setValue: UseFormSetValue<KeywordsFormData>;
  keyword: string;
  onFocus: () => void;
  onClear: () => void;
}

export default function SearchInput({ register, setValue, keyword, onFocus, onClear }: SearchInputProps): JSX.Element {
  const debouncedSetValue = useDebouncedCallback((value: string) => {
    setValue("keyword", value);
  }, 300);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    debouncedSetValue(e.target.value);
  };

  return (
    <>
      <label htmlFor="keyword">
        <SearchIcon className="transition-colors duration-200 group-focus-within:text-purple-400" />
      </label>
      <input
        {...register("keyword", {
          onChange: handleInputChange,
        })}
        id="keyword"
        className="h-18 w-full bg-transparent focus:outline-none"
        onFocus={onFocus}
      />
      {keyword ? (
        <button type="button" onClick={onClear} className="flex items-center justify-center">
          <CancelIcon width="20" height="20" className="rounded-full bg-gray-200/20" />
        </button>
      ) : null}
    </>
  );
}
