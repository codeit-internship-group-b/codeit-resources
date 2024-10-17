export type Role = "admin" | "member";

export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  profileImage?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}
