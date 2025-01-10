import { parse, differenceInMinutes } from "date-fns";
import { type IReservation } from "@repo/types";
import { type UseFormGetValues } from "react-hook-form";
import { ERROR_MESSAGES, TIME_INTERVAL } from "@/app/constants/reservationFormConstants";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { type SelectedRoom } from "@/app/types/scheduletypes";
import { type CreateReservationRequest } from "@/api/reservations";

interface ValidateTimeParams {
  endAt: string;
  getValues: UseFormGetValues<CreateReservationRequest>;
  selectedMeetingRoom: SelectedRoom | null | undefined;
  selectedDate: {
    year: number;
    month: number;
    day: number;
  };
  meetingsData: IReservation[];
  selectedReservationId?: string;
}

export function validateEndAt({
  endAt,
  getValues,
  selectedMeetingRoom,
  selectedDate,
  meetingsData,
  selectedReservationId,
}: ValidateTimeParams): boolean | string {
  const startAtValue = getValues("startAt");

  if (!startAtValue || !endAt) {
    return ERROR_MESSAGES.timeRequired;
  }

  const start = parse(startAtValue, "HH:mm", new Date());
  const end = parse(endAt, "HH:mm", new Date());

  const diff = differenceInMinutes(end, start);

  if (diff < TIME_INTERVAL.minimumDifference) {
    return ERROR_MESSAGES.endTimeMinimum;
  }

  if (!selectedMeetingRoom?._id) {
    return true;
  }

  const { year, month, day } = selectedDate;

  const newStart = new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${startAtValue}:00`,
  );
  const newEnd = new Date(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${endAt}:00`);

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

    if (selectedReservationId === reservation._id) {
      return false;
    }

    const existingStart = new Date(reservation.startAt);
    const existingEnd = new Date(reservation.endAt);

    return newStart < existingEnd && newEnd > existingStart;
  });

  if (isOverlap) {
    return ERROR_MESSAGES.timeOverlap;
  }

  return true;
}
