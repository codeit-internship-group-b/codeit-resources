import Button from "@ui/src/components/common/Button";
import { BUTTON_TEXT } from "@/app/constants/reservationFormConstants";
import { type DeleteButtonProps } from "@/app/types/ReservationFormTypes";

export function DeleteButton({ onDelete }: DeleteButtonProps): JSX.Element {
  return (
    <Button variant="Primary" className="mt-20 h-48 w-full" onClick={onDelete}>
      {BUTTON_TEXT.delete}
    </Button>
  );
}
