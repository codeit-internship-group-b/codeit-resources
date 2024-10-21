export const Roles = ["admin", "member"] as const;
export type TRole = (typeof Roles)[number];

interface IUser {
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

export default IUser;
