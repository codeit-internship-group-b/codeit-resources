import { useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import type { SortOption } from "@repo/types/src/membersType";
import { type IUser } from "@repo/types";
import { getMembers } from "@/api/members";

interface UseMembersSuspenseQueryProps {
  selectedSort: SortOption;
  role?: string;
  team?: string;
}

export function useMembersSuspenseQuery({
  selectedSort,
  role,
  team,
}: UseMembersSuspenseQueryProps): UseSuspenseQueryResult<IUser[]> {
  return useSuspenseQuery({
    queryKey: ["members", { sort: selectedSort, role, team }],
    queryFn: () => {
      return getMembers(selectedSort, role, team);
    },
    staleTime: 0,
  });
}
