import { API_ENDPOINTS } from "@repo/constants";
import { axiosRequester } from "@/lib/axios";
import { type MemberWithStaticImage } from "../admin/members/types";

export const getMembers = async (): Promise<MemberWithStaticImage[]> => {
  const { data } = await axiosRequester<MemberWithStaticImage[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.USERS.GET_ALL,
    },
  });

  return data;
};
