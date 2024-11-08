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
      url: "users",
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
      url: "users/create",
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
      url: `users/${userId}`,
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
      url: `users/${userId}`,
    },
  });

  return data;
};
