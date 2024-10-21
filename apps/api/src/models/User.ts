import { Roles, type IUser } from "@repo/types/users";
import { Schema, model, type Document } from "mongoose";

export interface UserDocument extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Roles, default: "member" },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const User = model<UserDocument>("User", UserSchema);
