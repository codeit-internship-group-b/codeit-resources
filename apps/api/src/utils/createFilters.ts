import { type Filters, type GetUsersRequest } from "../types";

interface BuildFiltersParams {
  query: GetUsersRequest["query"];
}

export const createFilters = ({ query }: BuildFiltersParams): Filters => {
  const filters: Filters = {};

  if (query.role) {
    filters.role = query.role;
  }

  if (query.team) {
    filters.teams = { $in: [query.team] };
  }

  if (query.cursor) {
    filters._id = { $lt: query.cursor };
  }

  if (query.keyword) {
    filters.$or = [
      { name: { $regex: query.keyword, $options: "i" } },
      { email: { $regex: query.keyword, $options: "i" } },
    ];
  }

  return filters;
};
