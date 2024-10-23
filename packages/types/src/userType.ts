export const Role = ["admin", "member"] as const;
export type TRole = (typeof Role)[number];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  teams: string[];
  profileImage?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}
