import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType, type ITeam, type TeamType } from "@repo/types";
import axios from "axios";
import { axiosRequester } from "@/lib/axios";

const headers = new axios.AxiosHeaders();
headers.set("Content-Type", "application/json");

export const postCreateTeam = async (teamName: ITeam): Promise<ResponseType<ITeam>> => {
  const { data } = await axiosRequester({
    options: {
      method: "POST",
      headers,
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
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

interface MessageResponse {
  message: string;
}

export const deleteTeam = async (teamId: string): Promise<MessageResponse> => {
  const { data } = await axiosRequester({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.TEAMS.DELETE_TEAM(teamId),
    },
  });

  return data as MessageResponse;
};

interface UpdateRequest {
  teamId: string;
  newName: string;
}

export const updateTeam = async ({ teamId, newName }: UpdateRequest): Promise<MessageResponse> => {
  const { data } = await axiosRequester({
    options: {
      method: "PUT",
      headers,
      url: API_ENDPOINTS.TEAMS.UPDATE_TEAM(teamId),
      data: { name: newName },
    },
  });

  return data as unknown as MessageResponse;
};
