import { Roles, type IUser } from "@repo/types/userType";
import { Schema, type Types, model, type Document } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { config } from "dotenv";
import { emailValidator } from "../utils/emailValidator";

config();

interface UserDocument extends Omit<IUser, "_id">, Document {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 10,
      validate: {
        validator: (value: string) => value.length > 0,
        message: "유효한 이름을 입력해 주세요.",
      },
    },
    email: {
      type: String,
      required: true,
      minlength: 4,
      unique: true,
      trim: true,
      validate: {
        validator: emailValidator,
        message: "유효한 이메일 주소를 입력해 주세요.",
      },
    },
    password: { type: String, minlength: 4, trim: true },
    role: { type: String, enum: Roles, default: Roles[1] },
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

const saltRounds = 10;

UserSchema.pre("save", function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    next();
    return;
  }

  genSalt(saltRounds, (err, salt) => {
    if (err) {
      next(err);
      return;
    }

    hash(user.password, salt, (hashErr, hashedPassword) => {
      if (hashErr) {
        next(hashErr);
        return;
      }

      user.password = hashedPassword;
      next();
    });
  });
});

export const User = model<UserDocument>("User", UserSchema);
