import { Document, Schema, model } from "mongoose";

const ROLES = ["admin", "member"] as const;
type Role = (typeof ROLES)[number];

export interface TUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, default: "member" },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const User = model<TUser>("User", UserSchema);
