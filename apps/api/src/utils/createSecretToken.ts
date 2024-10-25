import { type TRole } from "@repo/types";
import { config } from "dotenv";
import { type Secret, sign } from "jsonwebtoken";

config();

export const createSecretToken = (id: string, role: TRole): string => {
  return sign({ id, role }, process.env.JWT_SECRET as Secret);
};
