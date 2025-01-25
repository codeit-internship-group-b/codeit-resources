import {
  type InfiniteData,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
  type UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { MembersResponse, MembersQueryParams } from "@repo/types/src/membersType";
import { type IUser } from "@repo/types";
import { getMembers } from "@/api/members";
import { QUERY_KEYS } from "@/lib/queryKey";

interface PageParam {
  pageParam: string | null;
}

export function useMembersSuspenseInfiniteQuery({
  selectedSort,
  role,
  team,
  keyword,
}: MembersQueryParams): UseSuspenseInfiniteQueryResult<IUser[]> {
  const options = infiniteQueryOptions({
    queryKey: QUERY_KEYS.MEMBERS.list({ selectedSort, role, team, keyword }),
    queryFn: ({ pageParam }: PageParam): Promise<MembersResponse> =>
      getMembers({
        selectedSort,
        role,
        team,
        keyword,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: MembersResponse) => lastPage.nextCursor,
    select: (data: InfiniteData<MembersResponse>) => data.pages.flatMap((page) => page.members),
  });

  return useSuspenseInfiniteQuery(options);
}
