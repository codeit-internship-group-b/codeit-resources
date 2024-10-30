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
