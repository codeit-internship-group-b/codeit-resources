import { type SortOption } from "@repo/types/src/membersType";

export const memberQueries = {
  all: ["members"],
  list: (params: { sort: SortOption; role?: string; team?: string; keyword?: string }) => [
    ...memberQueries.all,
    params,
  ],
};
