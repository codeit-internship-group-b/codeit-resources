import { useQuery, type UseQueryResult, useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { type TeamType } from "@repo/types";
import { getTeams } from "@/api/teams";

export const useSuspenseTeamsQuery = (): UseSuspenseQueryResult<TeamType[]> => {
  return useSuspenseQuery({ queryKey: ["teamsResponse"], queryFn: getTeams });
};

export const useTeamsQuery = (): UseQueryResult<TeamType[]> => {
  return useQuery({ queryKey: ["teamsResponse"], queryFn: getTeams });
};
