import cn from "@ui/src/utils/cn";

interface ErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <span className={cn("!text-13 text-error absolute bottom-10", className)} aria-live="polite">
      {message}
    </span>
  );
}
