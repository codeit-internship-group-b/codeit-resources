import { API_ENDPOINTS } from "@repo/constants";
import { type ChangePasswordPayload, type MessageResponse, type IUser } from "@repo/types";
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

export const patchUserPassword = async (payload: ChangePasswordPayload): Promise<MessageResponse> => {
  const { data } = await axiosRequester<MessageResponse>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.USERS.ME_PASSWORD,
      data: payload,
    },
  });

  return data;
};
