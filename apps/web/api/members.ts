import { type MemberWithStaticImage } from "@/app/admin/members/types";
import { axiosRequester } from "@/lib/axios";

type SortOption = "newest" | "oldest" | "alphabetical";

export const getMembers = async (sortOption: SortOption): Promise<MemberWithStaticImage[]> => {
  const { data } = await axiosRequester<MemberWithStaticImage[]>({
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

export const postMember = async (formData: FormData): Promise<FormData> => {
  const { data } = await axiosRequester({
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

export const patchMember = async (userId: string, formData: FormData): Promise<FormData> => {
  const { data } = await axiosRequester({
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

export const deleteMember = async (userId: string): Promise<string> => {
  const { data } = await axiosRequester<string>({
    options: {
      method: "DELETE",
      url: `users/${userId}`,
    },
  });

  return data;
};
