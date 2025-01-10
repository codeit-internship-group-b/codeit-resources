import { Controller } from "react-hook-form";
import Input from "@ui/src/components/common/Input";
import { ERROR_MESSAGES, FORM_LABELS } from "@/app/constants/reservationFormConstants";
import { type NotesInputProps } from "@/app/types/ReservationFormTypes";

export function NotesInput({ control }: NotesInputProps): JSX.Element {
  return (
    <Controller
      name="notes"
      control={control}
      rules={{ required: ERROR_MESSAGES.meetingTitleRequired }}
      render={({ field, fieldState: { error } }) => (
        <Input
          id="meeting-title"
          placeholder={FORM_LABELS.meetingTitlePlaceholder}
          {...field}
          error={error ? error : undefined}
        />
      )}
    />
  );
}
