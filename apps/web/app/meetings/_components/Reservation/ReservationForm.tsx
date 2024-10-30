"use client";

import Input from "@ui/src/components/common/Input";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm, Controller } from "react-hook-form";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useEffect } from "react";
import { timeOptions } from "@/app/constants/timeOptions";
import Profile from "@/components/common/Profile";
import { type ScheduleFormData, type Schedule } from "@/app/types/scheduletypes";

interface ReservationFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  selectedTime: string;
  selectedSchedule?: Schedule | null;
  resetTrigger?: number;
  selectedRoom?: string | null;
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
  const { onSubmit, selectedTime, resetTrigger, selectedRoom } = props;

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
    defaultValues: {
      meetingTitle: "",
      selectedRoom: selectedRoom ?? "",
      startTime: selectedTime,
      customStartTime: "",
      endTime: "",
      customEndTime: "",
      participants: [],
    },
  });

  const rooms = ["미팅룸 A", "미팅룸 B", "미팅룸 C", "미팅룸 D", "미팅룸 E", "녹음실 A", "녹음실 B", "녹음실 C"];
  const mockParticipants = [
    "배영준",
    "조현지",
    "김보경",
    "신승헌",
    "소혜린",
    "이대양",
    "이영훈",
    "이정민",
    "이지현",
    "천권희",
  ];

  const startTimeValue = watch("startTime");
  const customStartTimeValue = watch("customStartTime");
  const endTimeValue = watch("endTime");
  const participantsSelected = watch("participants").length > 0;

  // resetTrigger가 변경될 때마다 폼을 리셋
  useEffect(() => {
    reset({
      meetingTitle: "",
      selectedRoom: selectedRoom ?? "", // selectedRoom 포함
      startTime: selectedTime,
      customStartTime: "",
      endTime: "",
      customEndTime: "",
      participants: [],
    });
  }, [resetTrigger, reset, selectedTime, selectedRoom]);

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
        null;
      }
    }
  }, [startTimeValue, customStartTimeValue, setValue, selectedTime]);

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
            selectedValue={field.value}
            onSelect={(value: string | boolean) => {
              field.onChange(value);
            }}
            isError={Boolean(errors.selectedRoom)}
            errorMessage={errors.selectedRoom?.message ?? ""}
          >
            <Dropdown.Toggle title="회의실">{field.value || "회의실 선택"}</Dropdown.Toggle>
            <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
              {" "}
              {/* 스크롤 추가 */}
              {rooms.map((room) => (
                <Dropdown.Item key={room} value={room}>
                  {room}
                </Dropdown.Item>
              ))}
            </Dropdown.Wrapper>
          </Dropdown>
        )}
      />
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
                  {" "}
                  {/* 스크롤 추가 */}
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
                  {field.value.slice(0, 3).map((name) => (
                    <Profile key={name} size="size-27" name={name} textColor="black" className="ml-10" />
                  ))}
                  {field.value.length > 3 && (
                    <span className="text-purple-30 text-xs-semibold mx-10">+{field.value.length - 3}명</span>
                  )}
                </div>
              ) : (
                "참여자 선택"
              )}
            </MultiSelectDropdown.Toggle>
            <MultiSelectDropdown.Wrapper>
              {" "}
              {/* 스크롤 추가 */}
              {mockParticipants
                .sort((a, b) => {
                  const isASelected = field.value.includes(a);
                  const isBSelected = field.value.includes(b);

                  if (isASelected && !isBSelected) return -1;
                  if (!isASelected && isBSelected) return 1;
                  return 0;
                })
                .map((name) => (
                  <MultiSelectDropdown.Item key={name} value={name}>
                    <Profile name={name} size="size-27" textColor="black" />
                  </MultiSelectDropdown.Item>
                ))}
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
    </div>
  );
}
