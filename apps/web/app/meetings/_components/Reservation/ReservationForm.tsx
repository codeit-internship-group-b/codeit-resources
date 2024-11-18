"use client";

import Input from "@ui/src/components/common/Input";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm, Controller } from "react-hook-form";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useEffect, useState } from "react";
import { type TBaseItem, type IReservation, type IUser } from "@repo/types";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, notify } from "@ui/index";
import { timeOptions } from "@/app/constants/timeOptions";
import Profile from "@/components/common/Profile";
import { type SelectedRoom, type ScheduleFormData } from "@/app/types/scheduletypes";
import { getAllUser } from "@/api/users";
import { getAllItems } from "@/api/items";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { createReservation, CreateReservationRequest } from "@/api/reservations";
import { useDateStore } from "@/app/store/useDateStore";

interface ReservationFormProps {
  onSubmit: (data: CreateReservationRequest, itemId: string) => void; // itemId 파라미터 추가
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  resetTrigger?: number;
  selectedRoom?: SelectedRoom | null;
}

export default function ReservationForm(props: ReservationFormProps): JSX.Element {
  const { onSubmit, selectedTime, resetTrigger, selectedRoom, selectedSchedule } = props;

  const MeetingRoomsType = "room";

  // useAuthStore를 사용하여 현재 사용자 데이터 가져오기
  const user = useAuthStore((state) => state.user); // 현재 사용자의 데이터 가져오기

  const { selectedDate } = useDateStore();

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
  const defaultValues: CreateReservationRequest = {
    userId: user!._id,
    itemType: "room",
    notes: selectedSchedule?.notes ?? "",
    startAt: selectedSchedule ? format(new Date(selectedSchedule.startAt), "HH:mm") : selectedTime,
    endAt: selectedSchedule ? format(new Date(selectedSchedule.endAt), "HH:mm") : "",
    status: "reserved",
    attendees: [],
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
  } = useForm<CreateReservationRequest>({
    defaultValues,
  });

  // 상태를 추가하여 제출된 데이터를 저장
  const [submittedData, setSubmittedData] = useState<{
    userId: string;
    itemType: string;
    startAt: string;
    endAt: string;
    status: string;
    notes: string;
    attendees: string[]; // 사용자 ID 배열로 변경
  } | null>(null);

  // ReservationForm 컴포넌트 내
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState<SelectedRoom | null | undefined>(selectedRoom);

  const attendeessSelected = watch("attendees").length > 0;

  // resetTrigger 또는 selectedSchedule이 변경될 때마다 폼을 리셋
  useEffect(() => {
    reset(defaultValues);
  }, [resetTrigger, reset, selectedTime, selectedRoom, selectedSchedule]);

  // startTime 또는 customStartTime이 변경될 때 endTime을 설정

  // 시작 시간과 종료 시간을 비교하여 유효성 검사

  const onFormSubmit = (data: CreateReservationRequest): void => {
    if (!user || !selectedRoom?._id) {
      return;
    }

    const attendeeIds = data.attendees
      .map((name: string) => {
        const selectedUser = allUsersData.find((user) => user.name === name);
        return selectedUser ? selectedUser._id : null;
      })
      .filter((id): id is string => id !== null);

    const { year, month, day } = selectedDate;

    const startAt = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.startAt}:00`;
    const endAt = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.endAt}:00`;

    const mappedData: CreateReservationRequest = {
      userId: user._id,
      itemType: "room",
      startAt,
      endAt,
      status: "reserved",
      notes: data.notes,
      attendees: attendeeIds,
    };

    // 상태에 저장하여 화면에 표시
    setSubmittedData(mappedData);

    onSubmit(mappedData, selectedMeetingRoom!._id);
  };

  return (
    <div className="px-16">
      {/* 미팅 제목 입력 */}
      <Controller
        name="notes"
        control={control}
        rules={{ required: "미팅 제목을 입력해주세요." }}
        render={({ field }) => <Input id="meeting-title" placeholder="미팅 제목" {...field} />}
      />
      {/* 미팅룸 선택 */}
      <Dropdown
        selectedValue={selectedMeetingRoom?.name || ""}
        onSelect={(value: string | boolean) => {
          if (typeof value === "string") {
            const room = roomsData.find((room) => room.name === value);
            if (room) {
              setSelectedMeetingRoom({ _id: room._id, name: room.name });
            }
          }
        }}
      >
        <Dropdown.Toggle title="회의실 선택">{selectedMeetingRoom?.name || "회의실 선택"}</Dropdown.Toggle>
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

      {/* 시작 시간 및 종료 시간 선택 */}
      <div className="my-16 flex justify-between gap-16">
        {/* 시작 시간 */}
        <div className="flex-1">
          <Controller
            name="startAt"
            control={control}
            rules={{ required: "시작 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                }}
                isError={Boolean(errors.startAt)}
                errorMessage={errors.startAt?.message ?? ""}
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
        </div>

        {/* 종료 시간 */}
        <div className="flex-1">
          <Controller
            name="endAt"
            control={control}
            rules={{ required: "종료 시간을 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                selectedValue={field.value}
                onSelect={(value: string | boolean) => {
                  field.onChange(value);
                }}
                isError={Boolean(errors.endAt)}
                errorMessage={errors.endAt?.message ?? ""}
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
        </div>
      </div>

      {/* 참여자 선택 */}
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
            <MultiSelectDropdown.Toggle title="참여자">
              {field.value.length > 0 ? (
                <div className="flex flex-wrap justify-between gap-2">
                  {field.value.slice(0, 3).map((name) => {
                    const user = allUsersData.find((user) => user.name === name);
                    return user ? (
                      <Badge key={user._id} color="purple" shape="round" colorApplyTo="font">
                        {user.name}
                      </Badge>
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
            <MultiSelectDropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
              {allUsersIsLoading ? (
                <div>사용자 데이터 로딩 중...</div>
              ) : allUsersIsError ? (
                <div>사용자 데이터를 불러오는 데 실패했습니다.</div>
              ) : allUsersData.length === 0 ? (
                <div>참여자가 없습니다.</div>
              ) : (
                allUsersData.map((user) => (
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
                        {user.teams.map((team, index) => (
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
                ))
              )}
            </MultiSelectDropdown.Wrapper>
          </MultiSelectDropdown>
        )}
      />

      <Button
        variant="Primary"
        className="mt-20 h-48 w-full"
        onClick={handleSubmit(onFormSubmit)}
        isActive={isValid ? attendeessSelected : undefined} // 모든 필드가 유효하고 참여자가 선택된 경우에만 활성화
      >
        예약하기
      </Button>

      {/* 제출된 데이터 표시 */}
      {submittedData && (
        <div className="mt-16 rounded-md bg-gray-100 p-16">
          <h3 className="mb-8 text-lg font-semibold">제출된 데이터</h3>
          <pre className="whitespace-pre-wrap rounded bg-gray-200 p-4">
            {JSON.stringify(submittedData, null, 2)}
            <div>회의실: {selectedMeetingRoom!._id || "선택된 회의실 없음"}</div>
          </pre>
        </div>
      )}
    </div>
  );
}
