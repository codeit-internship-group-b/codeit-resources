import { getEmptyMessage } from "../_utils/getEmptyMessage";

interface EmptyState {
  activeTab: string;
}

export default function EmptyState({ activeTab }: EmptyState): JSX.Element {
  const message = getEmptyMessage(activeTab);

  return (
    <div className="min-h-400 flex items-center justify-center">
      <p className="text-20 text-custom-black/60">{message}</p>
    </div>
  );
}
