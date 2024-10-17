import { Role, type IUser } from "@repo/types/users";
import { Schema, model, Document } from "mongoose";

interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: "member" },
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
