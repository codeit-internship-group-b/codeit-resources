import { EMPTY_STATE_MESSAGES } from "@repo/constants/messages";
import { CancelIcon } from "@ui/public";

interface SearchHistoryListProps {
  keywords: string[];
  onSelect: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

export default function SearchHistoryList({ keywords, onSelect, onRemove }: SearchHistoryListProps): JSX.Element {
  if (keywords.length === 0) {
    return (
      <div className="justify h-130 flex items-center justify-center">
        <p className="text-lg-regular text-gray-200">{EMPTY_STATE_MESSAGES.SEARCH.NO_RESULT.RECENT}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-12">
      {keywords.map((keyword) => (
        <li key={keyword} className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onSelect(keyword);
            }}
          >
            <p className="text-md-regular">{keyword}</p>
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove(keyword);
            }}
          >
            <CancelIcon
              width="20"
              height="20"
              className="rounded-full bg-white"
              color="bg-custom-black hover:bg-purple-400"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
