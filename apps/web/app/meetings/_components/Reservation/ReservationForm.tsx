"use client";

import Input from "@ui/src/components/common/Input";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm, Controller } from "react-hook-form";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useEffect } from "react";
import { type TBaseItem, type IReservation, type IUser } from "@repo/types";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { timeOptions } from "@/app/constants/timeOptions";
import Profile from "@/components/common/Profile";
import { Badge } from "@ui/index";
import { type SelectedRoom, type ScheduleFormData } from "@/app/types/scheduletypes";
import { getAllItems } from "@/api/items";
import { getAllUser } from "@/api/users"; // 전체 사용자 데이터 가져오는 함수

interface ReservationFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  resetTrigger?: number;
  selectedRoom?: SelectedRoom | null; // name과 _id를 포함
}

const addMinutes = (time: string, minutesToAdd: number): string => {
  const parts = time.split(":");

  if (parts.length !== 2) {
    throw new Error("Invalid time format. Expected format HH:MM.");
  }

  const [hoursStr, minutesStr] = parts;
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid time format. Hours and minutes must be numbers.");
  }

  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  const formattedHours = newHours.toString().padStart(2, "0");
  const formattedMinutes = newMinutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export default function ReservationForm(props: ReservationFormProps): JSX.Element {
  const { onSubmit, selectedTime, resetTrigger, selectedRoom, selectedSchedule } = props;

  const MeetingRoomsType = "room";

  // 방 데이터를 useQuery로 가져오기
  const {
    data: roomsData = [],
    isLoading: roomsIsLoading,
    isError: roomsIsError,
  } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MeetingRoomsType],
    queryFn: () => getAllItems({ itemType: MeetingRoomsType }),
  });

  // 전체 사용자 데이터를 useQuery로 가져오기
  const {
    data: allUsersData = [],
    isLoading: allUsersIsLoading,
    isError: allUsersIsError,
  } = useQuery<IUser[]>({
    queryKey: ["AllUsers"],
    queryFn: getAllUser,
  });

  // 폼의 기본 값을 설정합니다.
  const defaultValues: ScheduleFormData = {
    meetingTitle: selectedSchedule?.notes ?? "",
    selectedRoom: selectedRoom ?? null,
    startTime: selectedSchedule ? format(new Date(selectedSchedule.startAt), "HH:mm") : selectedTime,
    customStartTime: "",
    endTime: selectedSchedule ? format(new Date(selectedSchedule.endAt), "HH:mm") : "",
    customEndTime: "",
    participants: [],
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm<ScheduleFormData>({
    defaultValues,
  });

  // 실제 사용자 목록을 participants 드롭다운에 적용합니다.
  const participantsOptions = allUsersData.map((user) => user.name);

  const startTimeValue = watch("startTime");
  const customStartTimeValue = watch("customStartTime");
  const endTimeValue = watch("endTime");
  const participantsSelected = watch("participants").length > 0;

  // resetTrigger 또는 selectedSchedule이 변경될 때마다 폼을 리셋
  useEffect(() => {
    reset(defaultValues);
  }, [resetTrigger, reset, selectedTime, selectedRoom, selectedSchedule]);

  // startTime 또는 customStartTime이 변경될 때 endTime을 설정
  useEffect(() => {
    let currentStartTime = selectedTime;

    if (startTimeValue === "custom-start" && customStartTimeValue) {
      currentStartTime = customStartTimeValue;
    } else if (startTimeValue && startTimeValue !== "custom-start") {
      currentStartTime = startTimeValue;
    }

    if (currentStartTime) {
      try {
        const newEndTime = addMinutes(currentStartTime, 30);
        setValue("endTime", newEndTime, { shouldValidate: true });
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    }
  }, [startTimeValue, customStartTimeValue, setValue, selectedTime]);

  // 시작 시간과 종료 시간을 비교하여 유효성 검사
  useEffect(() => {
    const compareTimes = (start: string, end: string): boolean => {
      const [startHour = 0, startMinute = 0] = start.split(":").map((value) => {
        const num = parseInt(value, 10);
        return isNaN(num) ? 0 : num;
      });

      const [endHour = 0, endMinute = 0] = end.split(":").map((value) => {
        const num = parseInt(value, 10);
        return isNaN(num) ? 0 : num;
      });

      return startHour > endHour || (startHour === endHour && startMinute >= endMinute);
    };

    const currentStartTime = startTimeValue === "custom-start" ? customStartTimeValue : startTimeValue;
    if (currentStartTime && endTimeValue && compareTimes(currentStartTime, endTimeValue)) {
      setError("endTime", {
        type: "manual",
        message: "종료 시간은 시작 시간보다 이후여야 합니다.",
      });
    } else {
      clearErrors("endTime");
    }
  }, [startTimeValue, customStartTimeValue, endTimeValue, setError, clearErrors]);

  return (
    <div className="px-16">
      {/* 미팅 제목 입력 */}
      <Controller
        name="meetingTitle"
        control={control}
        rules={{ required: "미팅 제목을 입력해주세요." }}
        render={({ field }) => <Input id="meeting-title" placeholder="미팅 제목" {...field} />}
      />

      {/* 미팅룸 선택 */}
      <Controller
        name="selectedRoom"
        control={control}
        rules={{ required: "회의실을 선택해주세요." }}
        render={({ field }) => (
          <Dropdown
            selectedValue={field.value?.name || ""}
            onSelect={(value: string | boolean) => {
              if (typeof value === "string") {
                const selected = roomsData.find((room) => room.name === value);
                if (selected) {
                  field.onChange(selected); // 전체 객체를 저장
                }
              }
            }}
            isError={Boolean(errors.selectedRoom)}
            errorMessage={errors.selectedRoom?.message ?? ""}
          >
            <Dropdown.Toggle title="회의실">{field.value ? field.value.name : "회의실 선택"}</Dropdown.Toggle>
            <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
              {roomsIsLoading ? (
                <div>회의실 로딩 중...</div>
              ) : roomsIsError ? (
                <div>회의실 정보를 불러오는 데 실패했습니다.</div>
              ) : (
                roomsData.map((room) => (
                  <Dropdown.Item key={room._id} value={room.name}>
                    {room.name}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Wrapper>
          </Dropdown>
        )}
      />

      {/* 선택된 방의 ID를 별도의 div에 표시 */}
      <div className="mt-4">
        {watch("selectedRoom") && (
          <div className="mt-2 text-sm text-gray-500">
            <strong>Room ID:</strong> {watch("selectedRoom")?._id}
          </div>
        )}
      </div>

      {/* 시작 시간 및 종료 시간 선택 */}
      <div className="my-16 flex justify-between gap-16">
        {/* 시작 시간 */}
        <div className="flex-1">
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "시작 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                }}
                isError={Boolean(errors.startTime)}
                errorMessage={errors.startTime?.message ?? ""}
              >
                <Dropdown.Toggle title="시작 시간">{field.value || selectedTime}</Dropdown.Toggle>
                <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
                  <Dropdown.Item value="custom-start">직접입력</Dropdown.Item>
                  {timeOptions.map((time) => (
                    <Dropdown.Item key={time} value={time}>
                      {time}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Wrapper>
              </Dropdown>
            )}
          />
          {startTimeValue === "custom-start" && (
            <Controller
              name="customStartTime"
              control={control}
              rules={{ required: "시작 시간을 입력해주세요." }}
              render={({ field }) => <Input id="custom-start-time" placeholder="시작 시간 (HH:MM)" {...field} />}
            />
          )}
        </div>

        {/* 종료 시간 */}
        <div className="flex-1">
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "종료 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                }}
                isError={Boolean(errors.endTime)}
                errorMessage={errors.endTime?.message ?? ""}
              >
                <Dropdown.Toggle title="종료 시간">{field.value || "종료 시간 선택"}</Dropdown.Toggle>
                <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
                  <Dropdown.Item value="custom-end">직접입력</Dropdown.Item>
                  {timeOptions.map((time) => (
                    <Dropdown.Item key={time} value={time}>
                      {time}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Wrapper>
              </Dropdown>
            )}
          />
          {endTimeValue === "custom-end" && (
            <Controller
              name="customEndTime"
              control={control}
              rules={{ required: "종료 시간을 입력해주세요." }}
              render={({ field }) => <Input id="custom-end-time" placeholder="종료 시간 (HH:MM)" {...field} />}
            />
          )}
        </div>
      </div>

      {/* 참여자 선택 */}
      <Controller
        name="participants"
        control={control}
        render={({ field }) => (
          <MultiSelectDropdown
            selectedValue={field.value}
            onSelect={(value: string[]) => {
              field.onChange(value);
            }}
          >
            <MultiSelectDropdown.Toggle title="참여자">
              {field.value.length > 0 ? (
                <div className="flex flex-wrap justify-between gap-2">
                  {field.value.slice(0, 3).map((name) => {
                    const user = allUsersData.find((user) => user.name === name);
                    return user ? (
                      <div key={user._id} className="flex items-center space-x-2">
                        <Profile name={user.name} size="size-27" textColor="black" className="ml-10" />
                      </div>
                    ) : null;
                  })}
                  {field.value.length > 3 && (
                    <span className="text-purple-30 text-xs-semibold mx-10">+{field.value.length - 3}명</span>
                  )}
                </div>
              ) : (
                "참여자 선택"
              )}
            </MultiSelectDropdown.Toggle>
            <MultiSelectDropdown.Wrapper>
              {allUsersIsLoading ? (
                <div>사용자 데이터 로딩 중...</div>
              ) : allUsersIsError ? (
                <div>사용자 데이터를 불러오는 데 실패했습니다.</div>
              ) : allUsersData.length === 0 ? (
                <div>참여자가 없습니다.</div>
              ) : (
                allUsersData.map((user) => (
                  <MultiSelectDropdown.Item key={user._id} value={user.name}>
                    <div className="flex items-center">
                      <Profile name={user.name} size="size-27" textColor="black" className="min-w-140" />
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {user.teams.map((team, index) => (
                            <Badge key={index} color="purple" shape="round" colorApplyTo="font">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </MultiSelectDropdown.Item>
                ))
              )}
            </MultiSelectDropdown.Wrapper>
          </MultiSelectDropdown>
        )}
      />

      <Button
        variant="Primary"
        className="mt-20 h-48 w-full"
        onClick={() => {
          void handleSubmit(onSubmit)();
        }}
        isActive={isValid ? participantsSelected : undefined} // 모든 필드가 유효하고 참여자가 선택된 경우에만 활성화
      >
        예약하기
      </Button>

      {/* 예약 정보 표시 */}
      {selectedSchedule ? (
        <div className="mt-16 rounded-md bg-gray-100 p-16">
          <h3 className="mb-8 text-lg font-semibold">예약 정보</h3>
          <p>
            <strong>회의 제목:</strong> {selectedSchedule.notes}
          </p>
          <p>
            <strong>회의실:</strong> {selectedSchedule._id}
          </p>
          <p>
            <strong>시작 시간:</strong> {format(new Date(selectedSchedule.startAt), "yyyy-MM-dd HH:mm")}
          </p>
          <p>
            <strong>종료 시간:</strong> {format(new Date(selectedSchedule.endAt), "yyyy-MM-dd HH:mm")}
          </p>
          <p>
            <strong>참여자:</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
