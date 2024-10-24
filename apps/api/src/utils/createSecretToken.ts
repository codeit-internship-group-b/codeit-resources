import { config } from "dotenv";
import { type Secret, sign } from "jsonwebtoken";

config();

export const createSecretToken = (id: string): string => {
  return sign({ id }, process.env.JWT_SECRET as Secret);
};
