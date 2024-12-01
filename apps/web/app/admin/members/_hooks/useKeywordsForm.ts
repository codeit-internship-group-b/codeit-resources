import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { storage } from "@repo/ui/src/utils/storage";
import { type KeywordsFormData } from "@repo/types/src/searchFormType";

interface UseKeywordsFormProps extends UseFormProps {
  onSearch: (keyword: string) => void;
  initialKeyword: string;
  onClose: () => void;
}

interface UseKeywordsFormReturn extends UseFormReturn<KeywordsFormData> {
  watchedKeyword: string;
  recentKeywords: string[];
  handleClearInput: () => void;
  onSubmit: (data: KeywordsFormData) => void;
  handleRemoveKeyword: (keywordToRemove: string) => void;
  clearAllKeywords: () => void;
}

const DEFAULT_VALUES: KeywordsFormData = {
  keyword: "",
  recentKeywords: [],
};

export const useKeywordsForm = ({ onSearch, initialKeyword, onClose }: UseKeywordsFormProps): UseKeywordsFormReturn => {
  const form = useForm<KeywordsFormData>({
    defaultValues: {
      ...DEFAULT_VALUES,
      keyword: initialKeyword,
    },
  });
  const { setValue, watch } = form;
  const watchedKeyword = watch("keyword");
  const recentKeywords = watch("recentKeywords");

  const updateKeywords = (keywords: string[]): void => {
    setValue("recentKeywords", keywords);
    storage.set<string[]>("recentKeywords", keywords);
  };

  const handleClearInput = (): void => {
    setValue("keyword", "");
  };

  const handleRemoveKeyword = (keywordToRemove: string): void => {
    const updatedKeywords = recentKeywords.filter((keyword) => keyword !== keywordToRemove);
    updateKeywords(updatedKeywords);
  };

  const clearAllKeywords = (): void => {
    updateKeywords([]);
    onClose();
  };

  const onSubmit = (data: KeywordsFormData): void => {
    const trimmedKeyword = data.keyword.trim();
    const updatedKeywords = [trimmedKeyword, ...data.recentKeywords.filter((k) => k !== trimmedKeyword)].slice(0, 5);

    if (!trimmedKeyword) return;

    updateKeywords(updatedKeywords);
    onSearch(trimmedKeyword);
    onClose();
  };

  return {
    watchedKeyword,
    recentKeywords,
    handleClearInput,
    onSubmit,
    handleRemoveKeyword,
    clearAllKeywords,
    ...form,
  };
};
