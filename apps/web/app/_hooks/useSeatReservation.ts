import { type ReservationRequestBody, type ReservedResponse } from "@repo/types";
import { type UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { createSeatReservationData, deleteReservationData, modifyReservationData } from "@/api/reservation";

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

  // 좌석 예약 생성 뮤테이션
  const { mutate: createSeatReservation } = useMutation({
    mutationFn: createSeatReservationData,
    onSuccess: (response) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      notify({ type: "success", message: response.message });
      onSuccess?.();
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 좌석 예약 삭제 뮤테이션
  const { mutate: deleteSeatReservation } = useMutation({
    mutationFn: deleteReservationData,
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      notify({ type: "success", message: "자리 예약을 삭제했습니다" });
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 좌석 예약 수정 뮤테이션
  const { mutate: modifySeatReservation } = useMutation({
    mutationFn: modifyReservationData,
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      notify({ type: "success", message: "좌석 예약 성공!" });
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  return {
    createSeatReservation,
    deleteSeatReservation,
    modifySeatReservation,
  };
};
