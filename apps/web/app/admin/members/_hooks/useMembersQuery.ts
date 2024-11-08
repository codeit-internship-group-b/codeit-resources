import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/api/members";
import { type MemberWithStaticImage, type SortOption } from "../types";

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
