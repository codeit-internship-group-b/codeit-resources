import { type MemberWithStaticImage } from "@/app/admin/members/types";
import { axiosRequester } from "@/lib/axios";

export const getMembers = async (): Promise<MemberWithStaticImage[]> => {
  const { data } = await axiosRequester<MemberWithStaticImage[]>({
    options: {
      method: "GET",
      url: "users",
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
    },
  });

  return data;
};
