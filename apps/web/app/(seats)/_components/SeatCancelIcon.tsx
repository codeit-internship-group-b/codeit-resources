import { CancelIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { notify } from "@/app/store/useToastStore";

interface SeatCancelButtonProps {
  reservationId: string | null;
  onCancel: (reservationId: string | null) => void;
  isAdmin: boolean;
}

export default function SeatCancelIcon({ reservationId, onCancel, isAdmin }: SeatCancelButtonProps): JSX.Element {
  return (
    <CancelIcon
      onClick={(e) => {
        e.stopPropagation();
        if (reservationId) {
          onCancel(reservationId);
          return;
        }
        notify("error", "예약 정보를 찾을 수 없습니다. 페이지를 새로고침해주세요.");
      }}
      className={cn(
        "bg-custom-black absolute -right-6 -top-10 size-24 cursor-pointer rounded-full md:-right-4 md:-top-8",
        {
          "hidden group-hover:block": !isAdmin,
        },
      )}
    />
  );
}
