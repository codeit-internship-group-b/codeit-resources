export type Role = "admin" | "member";

export interface TUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  profileImage?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}
