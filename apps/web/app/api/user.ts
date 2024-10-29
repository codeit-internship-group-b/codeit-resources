import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType } from "@repo/types/src/responseType";
import { type IUser } from "@repo/types";
import { axiosRequester } from "../lib/axios";

export const getUser = async (userId: string): Promise<ResponseType<IUser>> => {
  const { data } = await axiosRequester<ResponseType<IUser>>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_USER(userId),
    },
  });

  console.log(data);

  return data;
};
