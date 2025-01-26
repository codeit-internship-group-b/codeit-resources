import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { storage } from "@repo/ui/src/utils/storage";
import { type KeywordsFormData } from "@repo/types/src/searchFormType";
import { DEFAULT_KEYWORD_VALUES } from "@repo/constants";

interface UseKeywordsFormProps extends UseFormProps {
  onClose: () => void;
}

interface UseKeywordsFormReturn extends UseFormReturn<KeywordsFormData> {
  searchHistory: string[];
  saveSearchHistory: (keywords: string[]) => void;
  clearInput: () => void;
  removeKeyword: (keywordToRemove: string) => void;
  removeAllKeywords: () => void;
}

export const useKeywordsForm = ({ onClose }: UseKeywordsFormProps): UseKeywordsFormReturn => {
  const form = useForm<KeywordsFormData>({
    defaultValues: DEFAULT_KEYWORD_VALUES,
  });
  const { setValue, watch } = form;
  const searchHistory = watch("searchHistory");

  const saveSearchHistory = (keywords: string[]): void => {
    setValue("searchHistory", keywords);
    storage.set<string[]>("searchHistory", keywords);
  };

  const clearInput = (): void => {
    setValue("keyword", "");
  };

  const removeKeyword = (keywordToRemove: string): void => {
    const updatedKeywords = searchHistory.filter((keyword) => keyword !== keywordToRemove);

    saveSearchHistory(updatedKeywords);
  };

  const removeAllKeywords = (): void => {
    saveSearchHistory([]);
    onClose();
  };

  return {
    searchHistory,
    saveSearchHistory,
    clearInput,
    removeKeyword,
    removeAllKeywords,
    ...form,
  };
};
