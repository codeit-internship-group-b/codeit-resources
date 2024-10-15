import { NextFunction, Request as ExpressRequest, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { TUser } from "../models/User";

interface Request extends ExpressRequest {
  user?: TUser;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Request["user"];
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
    next(error);
  }
};
