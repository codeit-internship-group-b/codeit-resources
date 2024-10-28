import { type IReservation } from "@repo/types";
import { axiosRequester } from "../app/lib/axios";

interface GetDashboardProps {
  userId: string;
}
/**
 * 대시보드 페이지를 조회하는 API 함수입니다.
 * @returns Group 객체를 반환합니다.
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
