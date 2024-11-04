import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/api/members";
import { type MemberWithStaticImage, type SortOption } from "../types";

interface UseMembersReturn {
  data: MemberWithStaticImage[] | undefined;
  isLoading: boolean;
}

export function useMembersQuery(selectedSort: SortOption): UseMembersReturn {
  return useQuery({
    queryKey: ["members", { sort: selectedSort }],
    queryFn: () => getMembers(selectedSort),
  });
}
