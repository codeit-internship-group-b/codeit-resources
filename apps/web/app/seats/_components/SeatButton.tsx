import cn from "@ui/src/utils/cn";

interface SeatButtonProps {
  isLoading?: boolean;
  status?: string;
  user?: string;
}

export default function SeatButton({ isLoading, status = "available", user }: SeatButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={cn(
        "md:w-90 rounded-4 relative h-36 w-60 min-w-60 overflow-hidden md:h-48",
        isLoading ? "bg-gray-10" : "border-custom-black/20 border border-solid", //
        {
          "bg-white": status === "available",
          "border-custom-black/30 text-custom-black/30 bg-gray-200/10 font-medium": status === "fixed",
          "bg-gray-200/5": status === "unavailable",
        },
      )}
    >
      {user}
      {status === "unavailable" && <span className="diagonal-line" />}
    </button>
  );
}
