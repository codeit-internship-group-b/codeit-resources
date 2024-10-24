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

  if (!email) {
    res.status(400).send({ message: "이메일을 입력해 주세요." });
    return;
  }
  if (!password) {
    res.status(400).send({ message: "비밀번호를 입력해 주세요." });
    return;
  }

  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    res.status(401).send({ message: "이메일 또는 비밀번호를 확인해 주세요." });
    return;
  }

  const accessToken = createSecretToken(user._id.toString());

  res.cookie("token", accessToken, {
    // secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  res.status(200).send({ accessToken });
};
