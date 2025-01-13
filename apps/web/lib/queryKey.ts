import { type UseMembersSuspenseInfiniteQueryParams } from "@/app/(admin)/members/_hooks/useMembersSuspenseInfiniteQuery";

export const QUERY_KEYS = {
  MEMBERS: {
    ALL: ["members"],
    list: (params: UseMembersSuspenseInfiniteQueryParams) => [...QUERY_KEYS.MEMBERS.ALL, params],
  },
  TEAMS: {
    ALL: ["teams"],
  },
  USER: ["user"],
  CATEGORIES: ["categories"],
  ROOMS: ["rooms"],
};
