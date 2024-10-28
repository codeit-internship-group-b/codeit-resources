export const Roles = ["어드민", "멤버"] as const;
export type TRole = (typeof Roles)[number];

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
