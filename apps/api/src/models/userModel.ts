import { Roles, type IUser } from "@repo/types/userType";
import { Schema, model, type Document } from "mongoose";
import { emailValidator } from "../utils/emailValidator";

interface UserDocument extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 10,
      validate: {
        validator: emailValidator,
        message: "유효한 이메일 주소를 입력해 주세요.",
      },
    },
    email: { type: String, required: true, minlength: 4, unique: true },
    password: { type: String, required: true, minlength: 4, trim: true },
    role: { type: String, enum: Roles, default: "member" },
    teams: {
      type: [String],
      ref: "Team",
      default: [],
    },
    profileImage: { type: String, default: process.env.DEFAULT_PROFILE_IMAGE_URL ?? "" },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>("User", UserSchema);
