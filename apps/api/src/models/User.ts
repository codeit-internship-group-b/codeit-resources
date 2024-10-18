import { IUser, Roles } from "@repo/types/users";
import { Document, Schema, model } from "mongoose";

export interface UserDoc extends Omit<IUser, "_id">, Document {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Roles, default: "member" },
    profileImage: { type: String, default: "" },
    department: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const User = model<IUser>("User", UserSchema);
