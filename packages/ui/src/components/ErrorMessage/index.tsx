import cn from "@ui/src/utils/cn";

interface ErrorMessageProps {
  message: string | undefined;
  className: string;
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  return <span className={cn("absolute !text-13 text-error", className)}>{message}</span>;
}
