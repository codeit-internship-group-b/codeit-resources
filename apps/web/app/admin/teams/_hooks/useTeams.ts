import { useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { type TeamType } from "@repo/types";
import { getTeams } from "@/api/teams";

export const useTeams = (): UseSuspenseQueryResult<TeamType[]> => {
  return useSuspenseQuery({ queryKey: ["teamsResponse"], queryFn: getTeams });
};
