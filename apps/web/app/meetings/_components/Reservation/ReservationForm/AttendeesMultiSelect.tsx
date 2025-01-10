import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MultiSelectDropdown";
import { Controller } from "react-hook-form";
import { Badge } from "@ui/index";
import { type IUser } from "@repo/types";
import Profile from "@/components/common/Profile";
import { ERROR_MESSAGES, FORM_LABELS } from "@/app/constants/reservationFormConstants";
import { type AttendeesMultiSelectProps } from "@/app/types/ReservationFormTypes";

export function AttendeesMultiSelect({
  control,
  allUsersData,
  isLoading,
  isError,
}: AttendeesMultiSelectProps): JSX.Element {
  return (
    <Controller
      name="attendees"
      control={control}
      render={({ field }) => (
        <MultiSelectDropdown
          selectedValue={field.value}
          onSelect={(value: string[]) => {
            field.onChange(value);
          }}
        >
          <MultiSelectDropdown.Toggle title={FORM_LABELS.selectAttendees}>
            {field.value.length > 0 ? (
              <div className="flex flex-wrap justify-between gap-2">
                {field.value.slice(0, 3).map((name) => {
                  const matchingUser = allUsersData.find((user) => user.name === name);
                  return matchingUser ? (
                    <Badge key={matchingUser._id} color="purple" shape="round" colorApplyTo="font">
                      {matchingUser.name}
                    </Badge>
                  ) : null;
                })}
                {field.value.length > 3 && (
                  <span className="text-purple-30 text-xs-semibold mx-10">+{field.value.length - 3}명</span>
                )}
              </div>
            ) : (
              FORM_LABELS.selectAttendees
            )}
          </MultiSelectDropdown.Toggle>
          <MultiSelectDropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
            {isLoading ? <div>사용자 데이터 로딩 중...</div> : null}
            {isError && !isLoading ? <div>{ERROR_MESSAGES.userFetchError}</div> : null}
            {!isLoading && !isError && allUsersData.length === 0 && <div>참여자가 없습니다.</div>}
            {!isLoading &&
              !isError &&
              allUsersData.length > 0 &&
              allUsersData.map((user: IUser) => (
                <MultiSelectDropdown.Item key={user._id} value={user.name}>
                  <div className="flex items-center space-x-2">
                    <Profile
                      name={user.name}
                      size="size-27"
                      textColor="black"
                      src={user.profileImage}
                      className="min-w-140"
                    />
                    <div className="flex flex-wrap gap-2">
                      {user.teams.map((team: string) => (
                        <div
                          key={team}
                          className="text-xxs-medium flex h-12 items-center justify-center rounded-lg bg-purple-100 p-6 py-10 text-purple-300"
                        >
                          {team}
                        </div>
                      ))}
                    </div>
                  </div>
                </MultiSelectDropdown.Item>
              ))}
          </MultiSelectDropdown.Wrapper>
        </MultiSelectDropdown>
      )}
    />
  );
}
