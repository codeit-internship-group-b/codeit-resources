import { API_ENDPOINTS } from "@repo/constants";
import { type ISeat } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

/**
 * 모든 좌석 데이터를 가져옵니다.
 * @returns 모든 좌석 데이터를 포함하는 Promise.
 */
export const getAllSeats = async (): Promise<ISeat[]> => {
  const { data } = await axiosRequester<ISeat[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.ITEMS.GET_ALL("seat"),
    },
  });

  return data;
};

/**
 * 특정 아이템 데이터를 수정합니다.
 * @returns 수정 결과 메시지를 포함하는 Promise.
 */
export const patchItem = async (itemId: string, formData: FormData): Promise<string> => {
  const { data } = await axiosRequester<string, FormData>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.ITEMS.UPDATE_ITEM(itemId),
      data: formData,
    },
  });
  return data;
};
