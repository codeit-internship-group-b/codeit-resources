import { API_ENDPOINTS } from "@repo/constants";
import {
  type MemberResponse,
  type GetMembersResponse,
  type DeleteMemberResponse,
  type SortOption,
} from "@/app/admin/members/types";
import { axiosRequester } from "@/lib/axios";

export const getMembers = async (sortOption: SortOption): Promise<GetMembersResponse> => {
  const { data } = await axiosRequester<GetMembersResponse>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_ALL,
      params: {
        sortOption,
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
      method: "PUT",
      url: API_ENDPOINTS.USERS.PATCH_USER(userId),
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  return data;
};

export const deleteMember = async (userId: string): Promise<DeleteMemberResponse> => {
  const { data } = await axiosRequester<DeleteMemberResponse>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.USERS.DELETE_USER(userId),
    },
  });

  return data;
};
