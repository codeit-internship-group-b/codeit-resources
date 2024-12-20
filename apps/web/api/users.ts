import { API_ENDPOINTS } from "@repo/constants";
import { type IUser } from "@repo/types";
import { axiosRequester } from "@/lib/axios";
import { type ChangePasswordPayload } from "@/app/settings/_components/ChangePasswordForm";

interface MessageResponse {
  message: string;
}

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
