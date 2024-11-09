import { API_ENDPOINTS } from "@repo/constants";
import { type ISeat } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const getAllSeats = async (): Promise<ISeat[]> => {
  const { data } = await axiosRequester<ISeat[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.ITEMS.GET_ALL("seat"),
    },
  });

  return data;
};
