import { API_ENDPOINTS } from "@repo/constants";
import { type ITeam } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

interface PostCreateTeamProps {
  message?: string;
  newTeam: ITeam;
}

export const postCreateTeam = async (newTeam: ITeam): Promise<PostCreateTeamProps> => {
  const { data } = await axiosRequester<PostCreateTeamProps>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.TEAMS.CREATE_TEAM,
      data: { newTeam },
    },
  });

  return data;
};
