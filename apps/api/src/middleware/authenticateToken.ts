import { type NextFunction, type Request, type Response } from "express";
import { type JwtPayload, verify, type Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../models/userModel";

config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

interface AuthenticateTokenRequest extends Request {
  token: string;
}

type CustomJwtPayload = JwtPayload & { id: string };

export const authenticateToken = async (
  req: AuthenticateTokenRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
    }

    const decodedToken = verify(token, JWT_SECRET) as CustomJwtPayload;
    const userId = decodedToken.id;

    if (!userId) {
      throw new Error("잘못된 토큰입니다.");
    }

    console.log(decodedToken);

    const user = await User.findById(userId);

    if (!user) {
      res.clearCookie("authorization");
      throw new Error("사용자가 존재하지 않습니다.");
    }

    next();
  } catch (error) {
    // const err = error as Error;
    // res.clearCookie("authorization");
    // res.status(401).send({ message: err.message });

    res.clearCookie("authorization");
    next(error);
  }
};
