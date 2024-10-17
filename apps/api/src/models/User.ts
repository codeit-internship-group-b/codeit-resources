import { Role, type IUser } from "@repo/types/users";
import { Schema, model } from "mongoose";

const UserSchema = new Schema<IUser>(
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

export const User = model<IUser>("User", UserSchema);
