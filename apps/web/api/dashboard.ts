import { type IReservation } from "@repo/types";
import { axiosRequester } from "../app/lib/axios";

interface GetDashboardProps {
  userId: string;
}
/**
 * 대시보드 페이지를 조회하는 API 함수입니다.
 * @returns IReservation 배열을 반환합니다.
 */
export const getDashboard = async ({ userId }: GetDashboardProps): Promise<IReservation[]> => {
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: `/reservations/dashboard/${userId}`,
    },
  });

  return data;
};

/**
 * 아이템 아이디로 아이템을 조회하는 API 함수입니다.
 * @returns IItem 배열을 반환합니다.
 */
export const getItem = async ({ userId }: GetDashboardProps): Promise<IReservation[]> => {
  const { data } = await axiosRequester<IReservation[]>({
    options: {
      method: "GET",
      url: `/reservations/dashboard/${userId}`,
    },
  });

  return data;
};

/**
 * 대시보드 페이지의 회의를 종료하는 API 함수입니다.
 * @returns
 */
export const patchMeetingStatus = async (_id: string): Promise<Partial<IReservation>> => {
  const { data } = await axiosRequester<Partial<IReservation>>({
    options: {
      method: "PATCH",
      url: `/reservations/${_id}`,
      data: {
        status: "completed",
      },
    },
  });

  return data;
};
