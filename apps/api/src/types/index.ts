import { type IUser, type TRole } from "@repo/types";
import { type FilterQuery } from "mongoose";

export interface GetUsersRequest extends Request {
  query: {
    role?: TRole;
    team?: string;
    sortOption?: "newest" | "oldest" | "alphabetical";
    cursor?: string;
    keyword?: string;
  };
}

export interface Filters extends FilterQuery<IUser> {
  role?: TRole;
  teams?: { $in: string[] };
  _id?: { $lt: string };
  $or?: Record<
    string,
    {
      $regex: string;
      $options: string;
    }
  >[];
}
