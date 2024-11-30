import { useForm, useWatch } from "react-hook-form";
import { SearchIcon, CancelIcon } from "@ui/public";

interface SearchFormProps {
  onSearch: (keyword: string) => void;
  keyword: string;
}

interface SearchFormData {
  keyword: string;
}

export default function SearchForm({ onSearch, keyword }: SearchFormProps): JSX.Element {
  const { register, handleSubmit, control, setValue } = useForm<SearchFormData>({
    defaultValues: {
      keyword,
    },
  });

  const watchedKeyword = useWatch({
    name: "keyword",
    control,
  });

  const handleClearKeyword = (): void => {
    setValue("keyword", "");
  };

  const onSubmit = (data: SearchFormData): void => {
    if (!data.keyword.trim()) return;
    onSearch(data.keyword.trim());
  };

  return (
    <form
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      className="rounded-100 border-1 focus-within:border-custom-black/20 group flex h-full w-full items-center gap-14 border-gray-100/30 bg-gray-100/30 px-20 transition-all duration-200 focus-within:bg-white hover:bg-gray-100/45 focus-within:hover:bg-white"
    >
      <label htmlFor="keyword">
        <SearchIcon className="transition-colors duration-200 group-focus-within:text-purple-400" />
      </label>
      <input {...register("keyword")} id="keyword" className="h-18 w-full bg-transparent focus:outline-none" />
      {watchedKeyword ? (
        <button type="button" onClick={handleClearKeyword} className="flex items-center justify-center">
          <CancelIcon width="20" height="20" className="rounded-full bg-gray-200/20" />
        </button>
      ) : null}
    </form>
  );
}
