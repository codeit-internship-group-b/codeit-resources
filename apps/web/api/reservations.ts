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
export interface CreateReservationParams {
  itemId: string;
  savedReservation: IReservation;
}

export interface CreateReservationRequest {
  userId: string;
  itemType: "room";
  startAt: string;
  endAt: string;
  status: "reserved";
  notes: string;
  attendees: string[];
}

export interface CreateReservationResponse {
  message: string;
  savedReservation: IReservation;
}

export const createReservation = async (
  itemId: string,
  reservationData: CreateReservationRequest,
): Promise<IReservation> => {
  const { data } = await axiosRequester<CreateReservationResponse>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.RESERVATION.CREATE_RESERVATION(itemId),
      data: reservationData,
    },
  });

  return data.savedReservation;
};

export interface UpdateReservationRequest {
  startAt?: string;
  endAt?: string;
  status?: TReservationStatus;
  notes?: string;
  attendees?: string[];
}

export interface UpdateReservationResponse {
  message: string;
  updatedReservation: IReservation;
}

export const updateReservation = async (
  reservationId: string,
  reservationData: UpdateReservationRequest,
): Promise<IReservation> => {
  const { data } = await axiosRequester<UpdateReservationResponse>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.RESERVATION.UPDATE_RESERVATION(reservationId),
      data: reservationData,
    },
  });

  return data.updatedReservation;
};
