import { API_ENDPOINTS } from "@repo/constants";
import { type IUser } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const getUser = async (): Promise<IUser> => {
  const { data } = await axiosRequester<IUser>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_USER(),
    },
  });

  return data;
};
