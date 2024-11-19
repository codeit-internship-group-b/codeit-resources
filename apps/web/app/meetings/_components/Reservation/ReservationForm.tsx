"use client";

import Input from "@ui/src/components/common/Input";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm, Controller } from "react-hook-form";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useEffect, useState } from "react";
import { type TBaseItem, type IReservation, type IUser } from "@repo/types";
import { format, parse, differenceInMinutes, addMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@ui/index";
import { timeOptions } from "@/app/constants/timeOptions";
import Profile from "@/components/common/Profile";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import { getAllUser } from "@/api/users";
import { getAllItems } from "@/api/items";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { getReservationsByTypeAndDate, type CreateReservationRequest } from "@/api/reservations";
import { useDateStore } from "@/app/store/useDateStore";

interface ReservationFormProps {
  onSubmit: (data: CreateReservationRequest, itemId: string) => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  resetTrigger?: number;
  selectedRoom?: SelectedRoom | null;
}

export default function ReservationForm(props: ReservationFormProps): JSX.Element {
  const { onSubmit, selectedTime, resetTrigger, selectedRoom, selectedSchedule } = props;

  const MeetingRoomsType = "room";

  // 현재 사용자 데이터 가져오기
  const user = useAuthStore((state) => state.user);
  const isEditMode = !!selectedSchedule && selectedSchedule.user._id === user?._id;

  const { selectedDate } = useDateStore();

  const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(
    2,
    "0",
  )}-${String(selectedDate.day).padStart(2, "0")}`;

  const { data: meetingsData = [], isLoading: meetingsIsLoading } = useQuery<IReservation[]>({
    queryKey: ["meetings", formattedDate, MeetingRoomsType],
    queryFn: () => getReservationsByTypeAndDate({ itemType: MeetingRoomsType, date: formattedDate }),
  });

  // 방 데이터 가져오기
  const {
    data: roomsData = [],
    isLoading: roomsIsLoading,
    isError: roomsIsError,
  } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MeetingRoomsType],
    queryFn: () => getAllItems({ itemType: MeetingRoomsType }),
  });

  // 전체 사용자 데이터 가져오기
  const {
    data: allUsersData = [],
    isLoading: allUsersIsLoading,
    isError: allUsersIsError,
  } = useQuery<IUser[]>({
    queryKey: ["AllUsers"],
    queryFn: getAllUser,
  });

  // 시작 시간을 기반으로 종료 시간을 설정하는 함수
  const getDefaultEndAt = (startAt: string): string => {
    const start = parse(startAt, "HH:mm", new Date());
    const end = addMinutes(start, 30);
    return format(end, "HH:mm");
  };

  // 폼의 기본 값을 설정합니다.
  const defaultValues: CreateReservationRequest = {
    userId: user!._id,
    itemType: "room",
    notes: selectedSchedule?.notes ?? "",
    startAt: selectedSchedule ? format(new Date(selectedSchedule.startAt), "HH:mm") : selectedTime,
    endAt: selectedSchedule ? format(new Date(selectedSchedule.endAt), "HH:mm") : getDefaultEndAt(selectedTime),
    status: "reserved",
    attendees: [],
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
    getValues,
    trigger,
    setError,
    setValue,
    clearErrors,
  } = useForm<CreateReservationRequest>({
    defaultValues,
    mode: "onChange",
  });

  const validateEndAt = (endAt: string): boolean | string => {
    const startAtValue = getValues("startAt");

    if (!startAtValue || !endAt) {
      return "시작 시간과 종료 시간을 모두 선택해주세요.";
    }

    // 시작 시간과 종료 시간을 파싱합니다.
    const start = parse(startAtValue, "HH:mm", new Date());
    const end = parse(endAt, "HH:mm", new Date());

    // 시간 차이를 계산합니다.
    const diff = differenceInMinutes(end, start);

    if (diff < 30) {
      return "종료 시간은 시작 시간보다 최소 30분 이후여야 합니다.";
    }

    // 추가: 시간 겹침 여부 확인
    if (!selectedMeetingRoom?._id) {
      return true; // 회의실이 선택되지 않은 경우 검증 통과
    }

    const { year, month, day } = selectedDate;

    const newStart = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${startAtValue}:00`,
    );
    const newEnd = new Date(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${endAt}:00`);

    const isOverlap = meetingsData.some((reservation) => {
      // 예약의 itemType이 "room"인지 확인합니다.
      if (reservation.itemType !== "room") {
        return false;
      }

      // 예약의 item에서 itemId를 추출합니다.
      let itemId: string;
      if (typeof reservation.item === "string") {
        itemId = reservation.item;
      } else if (reservation.item && "_id" in reservation.item) {
        itemId = reservation.item._id;
      } else {
        return false; // itemId를 추출할 수 없으면 건너뜁니다.
      }

      // 현재 선택된 회의실과 동일한지 확인합니다.
      if (itemId !== selectedMeetingRoom._id) {
        return false;
      }

      // 현재 수정 중인 예약은 제외합니다.
      if (selectedSchedule && reservation._id === selectedSchedule._id) {
        return false;
      }

      // 기존 예약의 시작 시간과 종료 시간을 Date 객체로 변환합니다.
      const existingStart = new Date(reservation.startAt);
      const existingEnd = new Date(reservation.endAt);

      // 시간 겹침 여부를 확인합니다.
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (isOverlap) {
      return "선택한 시간에 이미 예약이 있습니다.";
    }

    return true;
  };

  // 상태를 추가하여 제출된 데이터를 저장
  const [submittedData, setSubmittedData] = useState<CreateReservationRequest | null>(null);

  // ReservationForm 컴포넌트 내
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState<SelectedRoom | null | undefined>(selectedRoom);

  const attendeesSelected = watch("attendees").length > 0;
  const startAtValue = watch("startAt");
  const endAtValue = watch("endAt");

  // resetTrigger 또는 selectedSchedule이 변경될 때마다 폼을 리셋
  useEffect(() => {
    if (allUsersData.length > 0) {
      const newEndAt = selectedSchedule
        ? format(new Date(selectedSchedule.endAt), "HH:mm")
        : getDefaultEndAt(selectedTime);
      const attendeeNames = selectedSchedule?.attendees
        ? selectedSchedule.attendees
            .map((attendee) => attendee.name)
            .filter((name): name is string => name !== undefined)
        : [];
      reset({
        ...defaultValues,
        endAt: newEndAt,
        attendees: attendeeNames,
      });
    }
  }, [resetTrigger, reset, selectedTime, selectedRoom, selectedSchedule, allUsersData]);

  // startAt 값이 변경될 때 endAt을 자동으로 30분 후로 설정
  useEffect(() => {
    if (startAtValue) {
      const currentEndAt = parse(endAtValue, "HH:mm", new Date());
      const calculatedEndAt = addMinutes(parse(startAtValue, "HH:mm", new Date()), 30);

      // 종료 시간이 현재 설정된 종료 시간보다 작을 경우, 종료 시간을 30분 후로 설정
      if (differenceInMinutes(calculatedEndAt, currentEndAt) > 0) {
        const newEndAt = format(calculatedEndAt, "HH:mm");
        setValue("endAt", newEndAt);
      }
    }
  }, [startAtValue, endAtValue, setValue]);

  // onFormSubmit 함수 수정
  const onFormSubmit = (data: CreateReservationRequest): void => {
    if (!user || !selectedMeetingRoom?._id) {
      return;
    }

    const { year, month, day } = selectedDate;

    // 새로운 예약의 시작 시간과 종료 시간을 Date 객체로 변환합니다.
    const newStart = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.startAt}:00`,
    );
    const newEnd = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.endAt}:00`,
    );

    // 추가적인 검증: 종료 시간이 시작 시간 이후인지 확인합니다.
    if (newEnd <= newStart) {
      setError("endAt", {
        type: "manual",
        message: "종료 시간은 시작 시간 이후여야 합니다.",
      });
      return;
    }

    // 시간 겹침 여부를 확인하는 함수
    function isTimeOverlap(newStart: Date, newEnd: Date, existingStart: Date, existingEnd: Date): boolean {
      return newStart < existingEnd && newEnd > existingStart;
    }

    // 기존 예약과 시간 겹침 여부를 확인합니다.
    const isOverlap = meetingsData.some((reservation) => {
      // 예약의 itemType이 "room"인지 확인합니다.
      if (reservation.itemType !== "room") {
        return false;
      }

      // 예약의 item에서 itemId를 추출합니다.
      let itemId: string;
      if (typeof reservation.item === "string") {
        itemId = reservation.item;
      } else if (reservation.item && "_id" in reservation.item) {
        itemId = reservation.item._id;
      } else {
        return false; // itemId를 추출할 수 없으면 건너뜁니다.
      }

      // 현재 선택된 회의실과 동일한지 확인합니다.
      if (itemId !== selectedMeetingRoom._id) {
        return false;
      }

      // 현재 수정 중인 예약은 제외합니다.
      if (selectedSchedule && reservation._id === selectedSchedule._id) {
        return false;
      }

      // 기존 예약의 시작 시간과 종료 시간을 Date 객체로 변환합니다.
      const existingStart = new Date(reservation.startAt);
      const existingEnd = new Date(reservation.endAt);

      // 시간 겹침 여부를 확인합니다.
      return isTimeOverlap(newStart, newEnd, existingStart, existingEnd);
    });

    if (isOverlap) {
      setError("startAt", {
        type: "manual",
        message: "선택한 시간에 이미 예약이 있습니다.",
      });
      setError("endAt", {
        type: "manual",
        message: "선택한 시간에 이미 예약이 있습니다.",
      });
      return;
    }

    // 참석자 ID 배열 생성
    const attendeeIds = data.attendees
      .map((name: string) => {
        const selectedUser = allUsersData.find((user) => user.name === name);
        return selectedUser ? selectedUser._id : null;
      })
      .filter((id): id is string => id !== null);

    const startAt = newStart.toISOString();
    const endAt = newEnd.toISOString();

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
              // Trigger validation of endAt when meeting room changes
              trigger("endAt");
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
                  // Clear endAt error when startAt changes
                  clearErrors("endAt");
                  // Trigger validation of endAt
                  trigger("endAt");
                }}
                isError={Boolean(errors.startAt)}
                errorMessage={errors.startAt?.message ?? ""}
              >
                <Dropdown.Toggle title="시작 시간">{field.value || selectedTime}</Dropdown.Toggle>
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

        {/* 종료 시간 */}
        <div className="flex-1">
          <Controller
            name="endAt"
            control={control}
            rules={{
              required: "종료 시간을 선택해주세요.",
              validate: validateEndAt,
            }}
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

      {/* 예약하기 버튼 */}
      <Button
        variant="Primary"
        className="mt-20 h-48 w-full"
        onClick={handleSubmit(onFormSubmit)}
        isActive={isValid && attendeesSelected}
      >
        {isEditMode ? "수정하기" : "예약하기"}
      </Button>

      {/* 제출된 데이터 표시 */}
      {submittedData ? (
        <div className="mt-16 rounded-md bg-gray-100 p-16">
          <h3 className="mb-8 text-lg font-semibold">제출된 데이터</h3>
          <pre className="whitespace-pre-wrap rounded bg-gray-200 p-4">
            {JSON.stringify(submittedData, null, 2)}
            <div>
              회의실: {selectedMeetingRoom?._id || "선택된 회의실 없음"}
              {selectedTime}
            </div>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
