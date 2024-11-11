import { useQuery } from "@tanstack/react-query";
import type { MemberWithStaticImage, SortOption } from "@repo/types/src/membersType";
import { getMembers } from "@/api/members";

interface UseMembersQueryReturn {
  data: MemberWithStaticImage[] | undefined;
  isLoading: boolean;
}

export function useMembersQuery(selectedSort: SortOption): UseMembersQueryReturn {
  return useQuery({
    queryKey: ["members", { sort: selectedSort }],
    queryFn: () => getMembers(selectedSort),
  });
}
