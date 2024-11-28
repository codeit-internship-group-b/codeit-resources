import { type Filters, type GetUsersRequest } from "../types";

export const buildFilters = (params: GetUsersRequest["query"]): Filters => {
  const filters: Filters = {};

  if (params.role) {
    filters.role = params.role;
  }

  if (params.team) {
    filters.teams = { $in: [params.team] };
  }

  if (params.cursor) {
    filters._id = { $lt: params.cursor };
  }

  if (params.keyword) {
    filters.$or = [
      { name: { $regex: params.keyword, $options: "i" } },
      { email: { $regex: params.keyword, $options: "i" } },
    ];
  }

  return filters;
};
