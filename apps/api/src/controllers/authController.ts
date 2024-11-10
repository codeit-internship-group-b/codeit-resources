import { type Request, type Response } from "express";
import { compare } from "bcryptjs";
import { User } from "../models/userModel";
import { createSecretToken } from "../utils/createSecretToken";

interface SignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

/**
 * @swagger
 * /sign-in:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: 사용자 로그인
 *     description: 사용자가 이메일과 비밀번호로 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: 로그인할 사용자 이메일
 *               password:
 *                 type: string
 *                 description: 로그인할 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공, 엑세스 토큰과 사용자 정보가 반환됩니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - accessToken
 *                 - user
 *                 - message
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: 사용자 엑세스 토큰
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 ID
 *                     name:
 *                       type: string
 *                       description: 사용자 이름
 *                     email:
 *                       type: string
 *                       description: 사용자 이메일
 *                     role:
 *                       type: string
 *                       description: 사용자 역할
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *       400:
 *         description: 필수 정보(이메일 또는 비밀번호)가 누락되었습니다.
 *       401:
 *         description: 잘못된 이메일 또는 비밀번호입니다.
 */
export const signIn = async (req: SignInRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    const missingField = !email ? "이메일" : "비밀번호";
    res.status(400).send({ message: `${missingField}을(를) 입력해 주세요.` });
    return;
  }

  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    res.status(401).send({ message: "이메일 또는 비밀번호를 확인해 주세요." });
    return;
  }

  const accessToken = createSecretToken(user._id.toString(), user.role);

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", accessToken, {
    secure: isProduction,
    httpOnly: true,
    sameSite: "none",
  });

  res.status(200).send({ accessToken, user, message: "배움의 기쁨을 세상 모두에게. 오늘도 환영합니다 :)" });
};
