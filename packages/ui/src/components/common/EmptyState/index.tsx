interface EmptyStateProps {
  message: {
    title: string;
    description: string;
  };
}

export default function EmptyState({ message }: EmptyStateProps): JSX.Element {
  return (
    <div className="min-h-400 flex flex-col items-center justify-center">
      <p className="text-20 text-custom-black/60">{message.title}</p>
      <p className="text-20 text-custom-black/60">{message.description}</p>
    </div>
  );
}
