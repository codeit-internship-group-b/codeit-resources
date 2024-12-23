import { type ReservationRequestBody, type ReservedResponse } from "@repo/types";
import { type UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { createSeatReservationData, deleteReservationData, modifyReservationData } from "@/api/reservation";
import { notify } from "../store/useToastStore";

interface SeatReservationMutations {
  createSeatReservation: UseMutateFunction<
    ReservedResponse,
    Error,
    { seatId: string; reservationData: ReservationRequestBody }
  >;
  deleteSeatReservation: UseMutateFunction<unknown, Error, string | null>;
  modifySeatReservation: UseMutateFunction<
    { deleteResult: ReservedResponse; createResult: ReservedResponse },
    Error,
    {
      seatId?: string;
      reservationData?: ReservationRequestBody;
      reservationId?: string | null;
    }
  >;
}

export const useSeatReservation = (onSuccess?: () => void): SeatReservationMutations => {
  const queryClient = useQueryClient();

  const invalidateReservationQueries = async (): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["seats"] }),
      queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
    ]);
  };

  // 좌석 예약 생성 뮤테이션
  const { mutate: createSeatReservation } = useMutation({
    mutationFn: createSeatReservationData,
    onSuccess: (response) => {
      void invalidateReservationQueries();
      notify("success", response.message);
      onSuccess?.();
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });

  // 좌석 예약 삭제 뮤테이션
  const { mutate: deleteSeatReservation } = useMutation({
    mutationFn: deleteReservationData,
    onSuccess: () => {
      void invalidateReservationQueries();
      notify("success", "자리 예약을 삭제했습니다");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });

  // 좌석 예약 수정 뮤테이션
  const { mutate: modifySeatReservation } = useMutation({
    mutationFn: modifyReservationData,
    onSuccess: () => {
      void invalidateReservationQueries();
      notify("success", "좌석 예약 성공!");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });

  return {
    createSeatReservation,
    deleteSeatReservation,
    modifySeatReservation,
  };
};
