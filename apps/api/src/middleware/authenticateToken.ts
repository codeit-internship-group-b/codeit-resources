import { type NextFunction, type Request as ExpressRequest, type Response } from "express";
import { JsonWebTokenError, verify, type Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { type IUser } from "@repo/types/src/userType";

config();

interface Request extends ExpressRequest {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).send();
    return;
  }

  try {
    const decoded = verify(token, JWT_SECRET) as Request["user"];
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(403).json({ message: "유효하지 않은 토큰입니다." });
      return;
    }
    next(error);
  }
};
