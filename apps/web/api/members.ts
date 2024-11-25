import { API_ENDPOINTS } from "@repo/constants";
import type { MemberResponse, ResponseWithMessage, SortOption } from "@repo/types/src/membersType";
import { type IUser } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const getMembers = async (sortOption: SortOption, role?: string, team?: string): Promise<IUser[]> => {
  const { data } = await axiosRequester<IUser[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_ALL,
      params: {
        sortOption,
        role,
        team,
      },
    },
  });
  return data;
};

export const postMember = async (formData: FormData): Promise<MemberResponse> => {
  const { data } = await axiosRequester<MemberResponse, FormData>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.USERS.CREATE_USER,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  return data;
};

export const patchMember = async (userId: string, formData: FormData): Promise<MemberResponse> => {
  const { data } = await axiosRequester<MemberResponse, FormData>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.USERS.PATCH_USER(userId),
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  return data;
};

export const deleteMember = async (userId: string): Promise<ResponseWithMessage> => {
  const { data } = await axiosRequester<ResponseWithMessage>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.USERS.DELETE_USER(userId),
    },
  });

  return data;
};
