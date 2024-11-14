import { API_ENDPOINTS } from "@repo/constants";
import { type IReservation, type TReservationStatus } from "@repo/types/src/reservationType";
import { axiosRequester } from "@/lib/axios";

// 특정 유저의 오늘 날짜 예약 전체 조회
interface GetUserReservationsParams {
  userId: string;
}

export const getUserReservations = async (params: GetUserReservationsParams): Promise<IReservation[]> => {
  const { userId } = params;
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.RESERVATION.GET_USER_RESERVATIONS(userId),
    },
  });

  return data;
};

// 아이템 타입 및 날짜에 대한 예약 조회
interface GetReservationsByTypeAndDateParams {
  itemType: "room" | "seat" | "equipment";
  date: string;
  status?: TReservationStatus;
}

export const getReservationsByTypeAndDate = async (
  params: GetReservationsByTypeAndDateParams,
): Promise<IReservation[]> => {
  const { itemType, date, status } = params;
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.RESERVATION.GET_RESERVATIONS_BY_TYPE_AND_DATE(itemType, date),
      params: {
        status,
      },
    },
  });

  return data;
};

// 예약 생성
interface CreateReservationParams {
  itemId: string;
  savedReservation: IReservation;
  message: string;
}

export const createReservation = async (params: CreateReservationParams): Promise<IReservation> => {
  const { itemId, ...data } = params;
  const { data: reservation } = await axiosRequester<{ message: string; savedReservation: IReservation }>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.RESERVATION.CREATE_RESERVATION(itemId),
      data,
    },
  });

  return reservation.savedReservation;
};
