/* eslint-disable */
// components/MeetingForm.tsx

"use client";

import React from "react";
import Input from "@ui/src/components/common/Input";
import Dropdown from "@ui/src/components/common/Dropdown";

import Profile from "@/components/common/Profile";
import { useForm, Controller } from "react-hook-form";
import Button from "@ui/src/components/common/Button";
import { timeOptions } from "@/app/constants/timeOptions";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";

interface FormData {
  meetingTitle: string;
  selectedRoom: string;
  startTime: string;
  customStartTime: string;
  endTime: string;
  customEndTime: string;
  participants: string[];
}

interface ReservationFormProps {
  onSubmit: (data: FormData) => void;
  selectedTime: string;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, selectedTime }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      meetingTitle: "",
      selectedRoom: "",
      startTime: selectedTime,
      customStartTime: "",
      endTime: "",
      customEndTime: "",
      participants: [],
    },
  });

  // Mock data
  const rooms = ["Meeting Room A", "Meeting Room B", "Meeting Room C", "Meeting Room D", "Meeting Room E"];
  const mockParticipants = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];

  // 시작 시간과 종료 시간을 watch하여 직접입력 여부 확인
  const startTimeValue = watch("startTime");
  const endTimeValue = watch("endTime");

  return (
    <div className="px-16">
      {/* 미팅 제목 입력 */}
      <Controller
        name="meetingTitle"
        control={control}
        rules={{ required: "미팅 제목을 입력해주세요." }}
        render={({ field }) => <Input id="meeting-title" placeholder="미팅 제목" {...field} />}
      />
      {errors.meetingTitle && <p className="text-red-500">{errors.meetingTitle.message}</p>}

      {/* 회의실 선택 */}
      <Controller
        name="selectedRoom"
        control={control}
        rules={{ required: "회의실을 선택해주세요." }}
        render={({ field }) => (
          <Dropdown
            selectedValue={field.value}
            onSelect={(value: string) => {
              field.onChange(value);
            }}
            isError={!!errors.selectedRoom}
            errorMessage={errors.selectedRoom?.message || ""}
          >
            <Dropdown.Toggle title="회의실">{field.value || "회의실 선택"}</Dropdown.Toggle>
            <Dropdown.Wrapper>
              {rooms.map((room) => (
                <Dropdown.Item key={room} value={room}>
                  {room}
                </Dropdown.Item>
              ))}
            </Dropdown.Wrapper>
          </Dropdown>
        )}
      />

      {/* 시간 선택 */}
      <div className="my-16 flex justify-between gap-16">
        <div className="flex-1">
          {/* 시작 시간 선택 */}
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "시작 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string) => {
                  field.onChange(value);
                }}
                isError={!!errors.startTime}
                errorMessage={errors.startTime?.message || ""}
              >
                <Dropdown.Toggle title="시작 시간">{field.value || "시작 시간 선택"}</Dropdown.Toggle>
                <Dropdown.Wrapper>
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
          {/* 직접입력 시작 시간 */}
          {startTimeValue === "custom-start" && (
            <Controller
              name="customStartTime"
              control={control}
              rules={{ required: "시작 시간을 입력해주세요." }}
              render={({ field }) => <Input id="custom-start-time" placeholder="시작 시간 (HH:MM)" {...field} />}
            />
          )}
          {errors.customStartTime && <p className="text-red-500">{errors.customStartTime.message}</p>}
        </div>
        <div className="flex-1">
          {/* 종료 시간 선택 */}
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "종료 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string) => {
                  field.onChange(value);
                }}
                isError={!!errors.endTime}
                errorMessage={errors.endTime?.message || ""}
              >
                <Dropdown.Toggle title="종료 시간">{field.value || "종료 시간 선택"}</Dropdown.Toggle>
                <Dropdown.Wrapper>
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
          {/* 직접입력 종료 시간 */}
          {endTimeValue === "custom-end" && (
            <Controller
              name="customEndTime"
              control={control}
              rules={{ required: "종료 시간을 입력해주세요." }}
              render={({ field }) => <Input id="custom-end-time" placeholder="종료 시간 (HH:MM)" {...field} />}
            />
          )}
          {errors.customEndTime && <p className="text-red-500">{errors.customEndTime.message}</p>}
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
                <div className="flex flex-wrap gap-2">
                  {field.value.slice(0, 4).map((name) => (
                    <Profile key={name} size="size-27" name={name} />
                  ))}
                  {field.value.length > 4 && <span>+{field.value.length - 4}명 더보기</span>}
                </div>
              ) : (
                "참여자 선택"
              )}
            </MultiSelectDropdown.Toggle>
            <MultiSelectDropdown.Wrapper>
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
                    <Profile name={name} size="size-27" />
                  </MultiSelectDropdown.Item>
                ))}
            </MultiSelectDropdown.Wrapper>
          </MultiSelectDropdown>
        )}
      />

      {/* 제출 버튼 */}
      <Button variant="Primary" className="mt-4 w-full" onClick={handleSubmit(onSubmit)}>
        예약하기
      </Button>
    </div>
  );
};
