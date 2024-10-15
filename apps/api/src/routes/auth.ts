import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const USERS = [{ id: 1, email: "user1@example.com", password: "$2a$10$gkXx5a...", username: "User One" }];

const JWT_SECRET = process.env.JWT_SECRET as string;

const authRouter: Router = Router();

authRouter.route("/").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = USERS.find((user) => user.email === email);

    if (!user) {
      return res.status(401).send({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// userRouter
//   .route("/")
//   .get((req, res, next) => {
//     res.send({ message: "사용자 목록 보기" });
//   })
//   .post((req, res, next) => {
//     res.send({ message: "사용자 추가하기" });
//   });

// userRouter
//   .route("/:id")
//   .patch((req, res, next) => {
//     res.send({ message: "사용자 수정하기" });
//   })
//   .delete((req, res, next) => {
//     res.send({ message: "사용자 삭제하기" });
//   });

// function adminOnly(req, res, next) {
//   // const authorization = req.get("Authorization");
//   // if (authorization) {
//   //   next();
//   // } else {
//   //   res.status(401).send({ message: "권한이 없습니다" });
//   // }
// }

export default authRouter;
