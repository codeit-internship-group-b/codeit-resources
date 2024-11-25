import Dropdown from "@ui/src/components/common/Dropdown";
import { Controller } from "react-hook-form";
import { timeOptions } from "@/app/constants/timeOptions";
import { FORM_LABELS, ERROR_MESSAGES } from "@/app/constants/reservationFormConstants";
import { type TimeSelectorsProps } from "@/app/types/ReservationFormTypes";

export function TimeSelectors({ control, errors, trigger, clearErrors }: TimeSelectorsProps): JSX.Element {
  return (
    <div className="my-16 flex justify-between gap-16">
      <div className="flex-1">
        <Controller
          name="startAt"
          control={control}
          rules={{ required: ERROR_MESSAGES.timeRequired }}
          render={({ field, fieldState: { error } }) => (
            <Dropdown
              selectedValue={field.value}
              onSelect={(value: string | boolean) => {
                field.onChange(value);
                clearErrors("endAt");
                trigger("endAt");
              }}
              isError={Boolean(error)}
              errorMessage={error?.message}
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
            validate: (value: string) => true, // 검증 로직을 메인 컴포넌트에서 처리
          }}
          render={({ field, fieldState: { error } }) => (
            <Dropdown
              selectedValue={field.value}
              onSelect={(value: string | boolean) => {
                field.onChange(value);
              }}
              isError={Boolean(error)}
              errorMessage={error?.message}
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
  );
}
