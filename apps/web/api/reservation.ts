import { API_ENDPOINTS } from "@repo/constants";
import { type ReservationRequestBody, type IReservation } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

/**
 * 유저의 예약을 조회하는 API 함수입니다.
 * @returns IReservation 배열을 반환합니다.
 */
export const getUserReservations = async (userId: string): Promise<IReservation[]> => {
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.RESERVATION.GET_USER_RESERVATIONS(userId),
    },
  });
  return data;
};

/**
 * 대시보드 페이지의 회의를 종료하는 API 함수입니다.
 * @returns IReservation 객체를 반환합니다.
 */
export const patchMeetingStatus = async (_id: string): Promise<IReservation> => {
  const { data } = await axiosRequester<IReservation>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.RESERVATION.UPDATE_RESERVATION(_id),
      data: {
        status: "completed",
      },
    },
  });

  return data;
};

/**
 * 좌석예약 페이지를 조회하는 API 함수입니다.
 * @returns IReservation 배열을 반환합니다.
 */
export const getSeats = async (date: string): Promise<IReservation[]> => {
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.RESERVATION.GET_RESERVATIONS_BY_TYPE_AND_DATE("seat", date),
    },
  });

  return data;
};

export const getReservedSeats = async (date: string): Promise<IReservation[]> => {
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.RESERVATION.GET_RESERVATIONS_BY_TYPE_AND_DATE("seat", date),
    },
  });

  return data;
};

export interface ReservedResponse {
  message: string;
  savedReservation: IReservation[];
}

export const createSeatReservationData = async ({
  seatId,
  reservationData,
}: {
  seatId: string;
  reservationData: ReservationRequestBody;
}): Promise<ReservedResponse> => {
  const { data } = await axiosRequester<ReservedResponse>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.RESERVATION.CREATE_RESERVATION(seatId),
      data: reservationData,
    },
  });
  return data;
};

export const deleteReservationData = async (reservationId: string | null): Promise<ReservedResponse> => {
  if (!reservationId) {
    throw new Error("Reservation ID is required");
  }

  const { data } = await axiosRequester<ReservedResponse>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.RESERVATION.DELETE_RESERVATION(reservationId),
    },
  });
  return data;
};
