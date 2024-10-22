export const Roles = ["admin", "member"] as const;
type TRole = (typeof Roles)[number];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  profileImage?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}