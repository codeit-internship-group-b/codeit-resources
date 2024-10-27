import { axiosRequester } from "@/app/lib/axios";
import { type MemberWithStaticImage } from "../types";

export const getMembers = async (): Promise<MemberWithStaticImage[]> => {
  const { data } = await axiosRequester<MemberWithStaticImage[]>({
    options: {
      method: "GET",
      url: "users",
    },
  });

  return data;
};
