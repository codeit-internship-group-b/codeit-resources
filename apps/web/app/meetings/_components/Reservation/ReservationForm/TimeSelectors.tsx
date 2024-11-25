/* eslint-disable @typescript-eslint/no-floating-promises */

import Dropdown from "@ui/src/components/common/Dropdown";
import { Controller } from "react-hook-form";
import { timeOptions } from "@/app/constants/timeOptions";
import { FORM_LABELS, ERROR_MESSAGES } from "@/app/constants/reservationFormConstants";
import { type TimeSelectorsProps } from "@/app/types/ReservationFormTypes";

export function TimeSelectors({
  control,
  errors,
  trigger,
  clearErrors,
  validateEndAt,
}: TimeSelectorsProps): JSX.Element {
  const errorMessages = [];
  if (errors.startAt) {
    errorMessages.push(errors.startAt.message);
  }
  if (errors.endAt) {
    errorMessages.push(errors.endAt.message);
  }

  return (
    <div className="my-16">
      <div className="flex justify-between gap-16">
        <div className="flex-1">
          <Controller
            name="startAt"
            control={control}
            rules={{ required: ERROR_MESSAGES.timeRequired }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                  clearErrors("endAt");
                  trigger("endAt");
                }}
                isError={Boolean(errors.startAt)}
              >
                <Dropdown.Toggle title={FORM_LABELS.selectStartTime}>
                  {field.value || FORM_LABELS.selectStartTime}
                </Dropdown.Toggle>
                <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
                  {timeOptions.map((time) => (
                    <Dropdown.Item key={time} value={time}>
                      {time}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Wrapper>
              </Dropdown>
            )}
          />
        </div>

        <div className="flex-1">
          <Controller
            name="endAt"
            control={control}
            rules={{
              required: ERROR_MESSAGES.timeRequired,
              validate: validateEndAt,
            }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                  trigger("endAt");
                }}
                isError={Boolean(errors.endAt)}
              >
                <Dropdown.Toggle title={FORM_LABELS.selectEndTime}>
                  {field.value || FORM_LABELS.selectEndTime}
                </Dropdown.Toggle>
                <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
                  {timeOptions.map((time) => (
                    <Dropdown.Item key={time} value={time}>
                      {time}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Wrapper>
              </Dropdown>
            )}
          />
        </div>
      </div>

      {errorMessages.length > 0 && (
        <div className="text-xs-medium mt-4 text-red-500">
          {errorMessages.map((msg, _) => (
            <div key={msg}>{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
}
