export const Role = ["admin", "member"] as const;
export type TRole = (typeof Role)[number];

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: TRole;
  profileImage?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}
