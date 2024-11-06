import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType, type ITeam } from "@repo/types";
import axios from "axios";
import { axiosRequester } from "@/lib/axios";

export const postCreateTeam = async (teamName: ITeam): Promise<ResponseType<ITeam>> => {
  const headers = new axios.AxiosHeaders();
  headers.set("Content-Type", "application/json");

  const { data } = await axiosRequester<ITeam>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
      headers,
      data: teamName,
    },
  });

  return data as ResponseType<ITeam>;
};
