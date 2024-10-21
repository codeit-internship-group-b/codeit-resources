import { type NextFunction, type Request, type Response } from "express";
import { type Secret, verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const adminCheckMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "권한이 없습니다." });
      return;
    }

    const decoded = verify(token, JWT_SECRET);

    if (!decoded) {
      res.status(401).send({ message: "토큰이 유효하지 않습니다." });
      return;
    }

    next();
  } catch (error) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
};
