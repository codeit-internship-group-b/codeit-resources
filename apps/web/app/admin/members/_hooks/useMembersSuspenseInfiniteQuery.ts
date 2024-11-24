import {
  type InfiniteData,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
  type UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { MembersResponse, SortOption } from "@repo/types/src/membersType";
import { type IUser } from "@repo/types";
import { getMembers } from "@/api/members";
import { memberQueries } from "@/lib/queryKey";

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
  const options = infiniteQueryOptions({
    queryKey: memberQueries.list({ sort: selectedSort, role, team }),
    queryFn: ({ pageParam }: PageParam): Promise<MembersResponse> =>
      getMembers({
        selectedSort,
        role,
        team,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: MembersResponse) => lastPage.nextCursor,
    select: (data: InfiniteData<MembersResponse>) => data.pages.flatMap((page) => page.members),
    staleTime: 0,
  });

  return useSuspenseInfiniteQuery(options);
}
