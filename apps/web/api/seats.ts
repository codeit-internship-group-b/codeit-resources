import { API_ENDPOINTS } from "@repo/constants";
import { type ISeat, type IReservation } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

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

export const getAllSeats = async (): Promise<ISeat[]> => {
  const { data } = await axiosRequester<ISeat[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.ITEMS.GET_ALL("seat"),
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
