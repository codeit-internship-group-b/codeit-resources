import { API_ENDPOINTS } from "@repo/constants";
import { type ResponseType, type ITeam, type TeamType, type MessageResponse } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const postCreateTeam = async (teamName: ITeam): Promise<ResponseType<ITeam>> => {
  const { data } = await axiosRequester<ResponseType<ITeam>>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
      data: teamName,
    },
  });

  return data;
};

export const getTeams = async (): Promise<TeamType[]> => {
  const { data } = await axiosRequester<TeamType[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.TEAMS.GET_ALL,
    },
  });

  return data;
};

export const deleteTeam = async (teamId: string): Promise<MessageResponse> => {
  const { data } = await axiosRequester<MessageResponse>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.TEAMS.DELETE_TEAM(teamId),
    },
  });

  return data;
};

interface UpdateRequest {
  teamId: string;
  newName: string;
}

export const updateTeamName = async ({ teamId, newName }: UpdateRequest): Promise<MessageResponse> => {
  const { data } = await axiosRequester<MessageResponse>({
    options: {
      method: "PUT",
      url: API_ENDPOINTS.TEAMS.UPDATE_TEAM_NAME(teamId),
      data: { name: newName },
    },
  });

  return data;
};

export const updateTeamOrder = async (updatedTeams: TeamType[]): Promise<ResponseType<TeamType[]>> => {
  const { data } = await axiosRequester<ResponseType<TeamType[]>>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.TEAMS.UPDATE_TEAM_ORDER,
      data: { updatedTeams },
    },
  });

  return data;
};
