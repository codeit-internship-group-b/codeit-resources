import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { storage } from "@repo/ui/src/utils/storage";
import { type KeywordsFormData } from "@repo/types/src/searchFormType";
import { DEFAULT_KEYWORD_VALUES } from "@repo/constants";

interface UseKeywordsFormProps extends UseFormProps {
  handleCloseHistory: () => void;
}

interface UseKeywordsFormReturn extends UseFormReturn<KeywordsFormData> {
  searchHistory: string[];
  saveSearchHistory: (keywords: string[]) => void;
  handleClearInput: () => void;
  handleRemovekeyword: (keywordToRemove: string) => void;
  handleRemoveAllKeywords: () => void;
}

export const useKeywordsForm = ({ handleCloseHistory }: UseKeywordsFormProps): UseKeywordsFormReturn => {
  const form = useForm<KeywordsFormData>({
    defaultValues: DEFAULT_KEYWORD_VALUES,
  });
  const { setValue, watch } = form;
  const searchHistory = watch("searchHistory");

  const saveSearchHistory = (keywords: string[]): void => {
    setValue("searchHistory", keywords);
    storage.set<string[]>("searchHistory", keywords);
  };

  const handleClearInput = (): void => {
    setValue("keyword", "");
  };

  const handleRemovekeyword = (keywordToRemove: string): void => {
    const updatedKeywords = searchHistory.filter((keyword) => keyword !== keywordToRemove);

    saveSearchHistory(updatedKeywords);
  };

  const handleRemoveAllKeywords = (): void => {
    saveSearchHistory([]);
    handleCloseHistory();
  };

  return {
    searchHistory,
    saveSearchHistory,
    handleClearInput,
    handleRemovekeyword,
    handleRemoveAllKeywords,
    ...form,
  };
};
