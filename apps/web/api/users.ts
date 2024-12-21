import { API_ENDPOINTS } from "@repo/constants";
import { type ChangePasswordPayload, type MessageResponse, type IUser, type ResponseType } from "@repo/types";
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

export const patchUserImage = async (formData: FormData): Promise<ResponseType<IUser>> => {
  const { data } = await axiosRequester<ResponseType<IUser>>({
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: API_ENDPOINTS.USERS.ME_IMAGE,
      data: formData,
    },
  });

  return data;
};
