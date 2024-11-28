import { type IUser } from "@repo/types";

interface PaginatedResponse {
  members: IUser[];
  nextCursor: string | null | undefined;
}

export const formatPaginatedResponse = (members: IUser[], pageSize: number): PaginatedResponse => {
  const hasNextPage = members.length > pageSize;
  const results = hasNextPage ? members.slice(0, -1) : members;

  return {
    members: results,
    nextCursor: hasNextPage ? results[results.length - 1]?._id.toString() : null,
  };
};
