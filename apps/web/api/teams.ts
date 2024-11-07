import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType, type ITeam, type TeamType } from "@repo/types";
import axios from "axios";
import { axiosRequester } from "@/lib/axios";

interface DeleteResponse {
  message: string;
}

const headers = new axios.AxiosHeaders();
headers.set("Content-Type", "application/json");

export const postCreateTeam = async (teamName: ITeam): Promise<ResponseType<ITeam>> => {
  const { data } = await axiosRequester({
    options: {
      method: "POST",
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
      headers,
      data: teamName,
    },
  });

  return data as ResponseType<ITeam>;
};

export const getTeams = async (): Promise<TeamType[]> => {
  const { data } = await axiosRequester({
    options: {
      method: "GET",
      url: API_ENDPOINTS.TEAMS.GET_ALL,
    },
  });

  return data as TeamType[];
};

export const deleteTeam = async (teamId: string): Promise<DeleteResponse> => {
  const { data } = await axiosRequester({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.TEAMS.DELETE_TEAM(teamId),
    },
  });

  return data as DeleteResponse;
};
