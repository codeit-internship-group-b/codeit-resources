import { Role, type IUser } from "@repo/types/userType";
import { Schema, model, type Document } from "mongoose";

interface UserDocument extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, maxlength: 10 },
    email: { type: String, required: true, minlength: 4 },
    password: { type: String, required: true, minlength: 4, trim: true },
    role: { type: String, enum: Role, default: "member" },
    teams: {
      type: [String],
      default: [],
    },

    // TODO : file도 받는 multiparts formadata로 만들기
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>("User", UserSchema);
