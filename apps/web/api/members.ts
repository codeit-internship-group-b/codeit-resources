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
