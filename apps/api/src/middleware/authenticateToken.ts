import { type NextFunction, type Request, type Response } from "express";
import { type JwtPayload, verify, type Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../models/userModel";
import { type IUser } from "@repo/types/src/userType";

config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

interface AuthenticateTokenRequest extends Request {
  token: string;
  user?: IUser;
}

type CustomJwtPayload = JwtPayload & { id: string };

export const authenticateToken = async (
  req: AuthenticateTokenRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(400).send({ message: "유효하지 않은 인증 헤더입니다." });
      return;
    }

    if (!token) {
      res.status(400).send({ message: "토큰이 존재하지 않습니다." });
      return;
    }

    const decodedToken = verify(token, JWT_SECRET) as CustomJwtPayload;
    const userId = decodedToken.id;

    if (!userId) {
      res.status(400).send({ message: "잘못된 토큰입니다." });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send({ message: "사용자가 존재하지 않습니다." });
      return;
    }

    // req.user = { ...user, _id: userId } as IUser;

    next();
  } catch (error) {
    next(error);
  }
};
