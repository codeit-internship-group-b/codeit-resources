export type Role = "admin" | "member";

export interface TUser {
  username: string;
  email: string;
  password: string;
  role: Role;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}
