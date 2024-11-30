import { API_ENDPOINTS } from "@repo/constants";
import type { MemberResponse, ResponseWithMessage, SortOption, MembersResponse } from "@repo/types/src/membersType";
import { axiosRequester } from "@/lib/axios";

interface GetMembersProps {
  selectedSort: SortOption;
  role?: string;
  team?: string;
  keyword?: string;
  cursor?: string | null;
}

export const getMembers = async ({
  selectedSort,
  role,
  team,
  keyword,
  cursor,
}: GetMembersProps): Promise<MembersResponse> => {
  const { data } = await axiosRequester<MembersResponse>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_ALL,
      params: {
        sortOption: selectedSort,
        role,
        team,
        keyword,
        cursor,
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
