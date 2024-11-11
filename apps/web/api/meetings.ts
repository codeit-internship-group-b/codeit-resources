import { API_ENDPOINTS } from "@repo/constants";
import { type ICategory } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const getAllCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosRequester<ICategory[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.CATEGORIES.GET_ALL,
    },
  });
  return data;
};
