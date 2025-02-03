import { type MembersQueryParams } from "@repo/types/src/membersType";

export const QUERY_KEYS = {
  MEMBERS: {
    ALL: ["members"],
    LIST: (params: MembersQueryParams) => [QUERY_KEYS.MEMBERS.ALL, params],
  },
  TEAMS: {
    ALL: ["teams"],
  },
  USER: ["user"],
  CATEGORIES: ["categories"],
  ROOMS: ["rooms"],
};
