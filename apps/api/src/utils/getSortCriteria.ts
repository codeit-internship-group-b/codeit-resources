import type { SortOption } from "@repo/types/membersType";

interface GetSortCriteriaParams {
  sortOption?: SortOption;
}

type SortCriteria = Record<string, 1 | -1>;

export const getSortCriteria = ({ sortOption }: GetSortCriteriaParams): SortCriteria => {
  switch (sortOption) {
    case "alphabetical":
      return { name: 1, _id: -1 };
    case "oldest":
      return { createdAt: 1, _id: -1 };
    default:
      return { createdAt: -1, _id: -1 };
  }
};
