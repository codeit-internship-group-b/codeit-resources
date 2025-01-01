"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { format, parse, differenceInMinutes, addMinutes } from "date-fns";
import { type TBaseItem, type IReservation } from "@repo/types";
import { Button } from "@ui/index";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { useDateStore } from "@/app/store/useDateStore";
import { getAllItems } from "@/api/items";
import { getReservationsByTypeAndDate, type CreateReservationRequest } from "@/api/reservations";
import { BUTTON_TEXT, ERROR_MESSAGES } from "@/app/constants/reservationFormConstants";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { formatDate } from "@/app/utils/formatDate";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import { type ReservationFormProps } from "@/app/types/ReservationFormTypes";
import { validateEndAt } from "@/app/utils/validateTime";
import { getMembers } from "@/api/members";
import { AttendeesMultiSelect } from "./ReservationForm/AttendeesMultiSelect";
import { DeleteButton } from "./ReservationForm/DeleteButton";
import { NotesInput } from "./ReservationForm/NotesInput";
import { RoomDropdown } from "./ReservationForm/RoomDropdown";
import { TimeSelectors } from "./ReservationForm/TimeSelectors";

export function ReservationForm({
  onSubmit,
  selectedTime,
  resetTrigger,
  selectedRoom,
  selectedSchedule,
  onDelete,
}: ReservationFormProps): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const isEditMode = selectedSchedule && selectedSchedule.user._id === user?._id;

  const { selectedDate } = useDateStore();

  const formattedDate = formatDate(selectedDate);

  const { data: meetingsData = [] } = useQuery<IReservation[]>({
    queryKey: ["meetings", formattedDate, MEETING_ROOMS_TYPE],
    queryFn: () => getReservationsByTypeAndDate({ itemType: MEETING_ROOMS_TYPE, date: formattedDate }),
  });

  const { data: roomsData = [] } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MEETING_ROOMS_TYPE],
    queryFn: () => getAllItems({ itemType: MEETING_ROOMS_TYPE }),
  });

  const {
    data: allUsersData,
    isLoading: allUsersIsLoading,
    isError: allUsersIsError,
  } = useQuery({
    queryKey: ["members", "newest"],
    queryFn: () =>
      getMembers({
        selectedSort: "newest",
      }),
  });

  const getDefaultEndAt = (startAt: string): string => {
    const start = parse(startAt, "HH:mm", new Date());
    const end = addMinutes(start, 30);
    return format(end, "HH:mm");
  };

  const defaultValues: CreateReservationRequest = {
    userId: user?._id ?? "",
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

  const validateEndAtFunction = (endAt: string): boolean | string => {
    return validateEndAt({
      endAt,
      getValues,
      selectedMeetingRoom,
      selectedDate,
      meetingsData,
      selectedReservationId: selectedSchedule?._id, // 추가된 부분
    });
  };

  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState<SelectedRoom | null | undefined>(selectedRoom);

  const attendeesSelected = watch("attendees").length > 0;
  const startAtValue = watch("startAt");
  const endAtValue = watch("endAt");

  useEffect(() => {
    if (allUsersData) {
      const newEndAt = selectedSchedule
        ? format(new Date(selectedSchedule.endAt), "HH:mm")
        : getDefaultEndAt(selectedTime);
      const attendeeNames = selectedSchedule?.attendees
        ? selectedSchedule.attendees.map((attendee) => attendee.name)
        : [];
      reset({
        ...defaultValues,
        endAt: newEndAt,
        attendees: attendeeNames,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTrigger, reset, selectedTime, selectedRoom, selectedSchedule, allUsersData]);

  useEffect(() => {
    if (startAtValue) {
      const currentEndAt = parse(endAtValue, "HH:mm", new Date());
      const calculatedEndAt = addMinutes(parse(startAtValue, "HH:mm", new Date()), 30);

      if (differenceInMinutes(calculatedEndAt, currentEndAt) > 0) {
        const newEndAt = format(calculatedEndAt, "HH:mm");
        setValue("endAt", newEndAt);
      }
    }
  }, [startAtValue, endAtValue, setValue]);

  const onFormSubmit: SubmitHandler<CreateReservationRequest> = (data) => {
    if (!user || !selectedMeetingRoom?._id) {
      return;
    }

    const { year, month, day } = selectedDate;

    const newStart = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.startAt}:00`,
    );

    const newEnd = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${data.endAt}:00`,
    );

    if (newEnd <= newStart) {
      setError("endAt", {
        type: "manual",
        message: ERROR_MESSAGES.endTimeMinimum,
      });
      return;
    }

    const isOverlap = meetingsData.some((reservation) => {
      if (reservation.itemType !== MEETING_ROOMS_TYPE) {
        return false;
      }

      let itemId: string;
      if (typeof reservation.item === "string") {
        itemId = reservation.item;
      } else if ("_id" in reservation.item) {
        itemId = reservation.item._id;
      } else {
        return false;
      }

      if (itemId !== selectedMeetingRoom._id) {
        return false;
      }

      if (selectedSchedule && reservation._id === selectedSchedule._id) {
        return false;
      }

      const existingStart = new Date(reservation.startAt);
      const existingEnd = new Date(reservation.endAt);

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (isOverlap) {
      setError("startAt", {
        type: "manual",
        message: ERROR_MESSAGES.timeOverlap,
      });
      setError("endAt", {
        type: "manual",
        message: ERROR_MESSAGES.timeOverlap,
      });
      return;
    }

    const attendeeIds = data.attendees
      .map((name: string) => {
        const selectedUser = allUsersData?.members.find((member) => member.name === name);
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

    onSubmit(mappedData, selectedMeetingRoom._id, selectedSchedule?._id);
  };

  return (
    <div className="px-16">
      <NotesInput control={control} />

      <RoomDropdown
        selectedRoom={selectedMeetingRoom?.name ?? ""}
        onSelect={(value: string) => {
          const roomData = roomsData.find((room) => room.name === value);
          if (roomData) {
            setSelectedMeetingRoom({ _id: roomData._id, name: roomData.name });
            void trigger("endAt");
          }
        }}
      />

      <TimeSelectors
        control={control}
        errors={errors}
        trigger={trigger}
        clearErrors={clearErrors}
        validateEndAt={validateEndAtFunction}
      />

      <AttendeesMultiSelect
        control={control}
        allUsersData={allUsersData?.members ?? []}
        isLoading={allUsersIsLoading}
        isError={allUsersIsError}
      />

      {isEditMode ? <DeleteButton onDelete={onDelete} /> : null}

      <Button
        variant="Primary"
        className="mt-20 h-48 w-full"
        onClick={() => {
          void handleSubmit(onFormSubmit)();
        }}
        isActive={isValid ? attendeesSelected : undefined}
      >
        {isEditMode ? BUTTON_TEXT.update : BUTTON_TEXT.create}
      </Button>
    </div>
  );
}
