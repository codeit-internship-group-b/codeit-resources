import { type TRole } from "@repo/types";
import { config } from "dotenv";
import { type Secret, sign } from "jsonwebtoken";

config();

export const createSecretToken = (id: string, role: TRole): string => {
  const JWT_SECRET = process.env.JWT_SECRET as Secret;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return sign({ id, role }, JWT_SECRET);
};
