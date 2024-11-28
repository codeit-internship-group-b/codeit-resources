import { type IUser } from "@repo/types";
import { User } from "../models";
import { type Filters } from "../types";

export const fetchUsers = async (
  filters: Filters,
  sortCriteria: Record<string, 1 | -1>,
  pageSize: number,
): Promise<IUser[]> => {
  const users = await User.find(filters)
    .select("-password")
    .sort(sortCriteria)
    .limit(pageSize + 1)
    .lean()
    .exec();

  return users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));
};
