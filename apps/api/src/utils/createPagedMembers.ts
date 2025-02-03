import { type IUser } from "@repo/types";

interface CreatePagedMembersParams {
  members: IUser[];
  pageSize: number;
}

interface PagedMembersResult {
  members: IUser[];
  nextCursor: string | null;
}

export const createPagedMembers = ({ members, pageSize }: CreatePagedMembersParams): PagedMembersResult => {
  const hasNextPage = members.length > pageSize;
  const results = hasNextPage ? members.slice(0, -1) : members;
  const lastMember = results[results.length - 1];

  return {
    members: results,
    nextCursor: hasNextPage && lastMember ? lastMember._id.toString() : null,
  };
};
