import { useQuery, type UseQueryResult, useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { type TeamType } from "@repo/types";
import { getTeams } from "@/api/teams";
import { QUERY_KEYS } from "@/lib/queryKey";

export const useSuspenseTeamsQuery = (): UseSuspenseQueryResult<TeamType[]> => {
  return useSuspenseQuery({ queryKey: QUERY_KEYS.TEAMS.ALL, queryFn: getTeams });
};

export const useTeamsQuery = (): UseQueryResult<TeamType[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.TEAMS.ALL,
    queryFn: getTeams,
  });
};
