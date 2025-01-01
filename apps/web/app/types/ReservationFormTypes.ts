import { type Control, type FieldErrors, type UseFormTrigger, type UseFormClearErrors } from "react-hook-form";
import { type IReservation, type IUser } from "@repo/types";
import { type CreateReservationRequest } from "@/api/reservations";
import { type SelectedRoom } from "@/app/types/scheduletypes";

export interface ReservationFormProps {
  onSubmit: (data: CreateReservationRequest, itemId: string, reservationId?: string) => void;
  selectedTime: string;
  selectedSchedule?: IReservation | null;
  resetTrigger?: number;
  selectedRoom?: SelectedRoom | null;
  onDelete: () => void;
}

export interface NotesInputProps {
  control: Control<CreateReservationRequest>;
}

export interface RoomDropdownProps {
  selectedRoom: string;
  onSelect: (value: string) => void;
}

export interface TimeSelectorsProps {
  control: Control<CreateReservationRequest>;
  errors: FieldErrors<CreateReservationRequest>;
  trigger: UseFormTrigger<CreateReservationRequest>;
  clearErrors: UseFormClearErrors<CreateReservationRequest>;
  validateEndAt: (endAt: string) => boolean | string;
}

export interface AttendeesMultiSelectProps {
  control: Control<CreateReservationRequest>;
  allUsersData: IUser[];
  isLoading: boolean;
  isError: boolean;
}

export interface DeleteButtonProps {
  onDelete: () => void;
}
