import { type IUser } from "@repo/types";

interface FormatPaginatedResponseParams {
  members: IUser[];
  pageSize: number;
}

interface PaginatedResponse {
  members: IUser[];
  nextCursor: string | null;
}

export const formatPaginatedResponse = ({ members, pageSize }: FormatPaginatedResponseParams): PaginatedResponse => {
  const hasNextPage = members.length > pageSize;
  const results = hasNextPage ? members.slice(0, -1) : members;
  const lastMember = results[results.length - 1];

  return {
    members: results,
    nextCursor: hasNextPage && lastMember ? lastMember._id.toString() : null,
  };
};
