import { type NextFunction, type Request, type Response } from "express";
import { type JwtPayload, verify, type Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { type IUser } from "@repo/types/src/userType";
import { User } from "../models/userModel";

config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

interface AuthenticateTokenRequest extends Request {
  user?: IUser;
}

type CustomJwtPayload = JwtPayload & { id: string; role: string };

export const authenticateToken = async (
  req: AuthenticateTokenRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "토큰이 존재하지 않습니다." });
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

  req.user = {
    ...user.toObject(),
    _id: userId,
  } as IUser;

  next();
};

export const verifyAdminAccess = async (
  req: AuthenticateTokenRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "토큰이 존재하지 않습니다." });
    return;
  }

  const decodedToken = verify(token, JWT_SECRET) as CustomJwtPayload;

  if (decodedToken.role !== "admin") {
    res.status(403).send({ message: "접근 권한이 없습니다." });
    return;
  }

  next();
};
