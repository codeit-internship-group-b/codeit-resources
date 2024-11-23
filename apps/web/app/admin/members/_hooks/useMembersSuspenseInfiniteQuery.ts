import { useSuspenseInfiniteQuery, type UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";
import type { MembersResponse, SortOption } from "@repo/types/src/membersType";
import { type IUser } from "@repo/types";
import { getMembers } from "@/api/members";

interface QueryProps {
  selectedSort: SortOption;
  role?: string;
  team?: string;
}

interface PageParam {
  pageParam: string | null;
}

export function useMembersSuspenseInfiniteQuery({
  selectedSort,
  role,
  team,
}: QueryProps): UseSuspenseInfiniteQueryResult<IUser[]> {
  const queryKey = ["members", { sort: selectedSort, role, team }];

  const fetchMembers = ({ pageParam }: PageParam): Promise<MembersResponse> =>
    getMembers({
      selectedSort,
      role,
      team,
      cursor: pageParam,
    });

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: fetchMembers,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages.flatMap((page) => page.members),
  });
}
