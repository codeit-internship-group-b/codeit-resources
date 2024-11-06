import { useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { type ITeam } from "@repo/types";
import { getTeams } from "@/api/teams";

export const useTeams = (): UseSuspenseQueryResult<ITeam[]> => {
  return useSuspenseQuery({ queryKey: ["teamsResponse"], queryFn: getTeams });
};
