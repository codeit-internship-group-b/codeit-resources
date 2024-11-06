import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType, type ITeam } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const postCreateTeam = async (teamName: ITeam): Promise<ResponseType<ITeam>> => {
  const { data } = await axiosRequester<ResponseType<ITeam>>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
      data: { data: teamName },
    },
  });

  return data;
};
