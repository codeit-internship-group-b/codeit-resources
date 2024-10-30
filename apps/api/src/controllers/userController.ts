import { type Request, type Response } from "express";
import { type IUser, type TRole } from "@repo/types";
import { config } from "dotenv";
import { compare } from "bcryptjs";
import { User } from "../models/userModel";

config();

interface GetUsersRequest extends Request {
  query: {
    role?: TRole;
    team?: string;
    sortOption?: "newest" | "oldest" | "alphabetical";
  };
}

interface Filters {
  role?: TRole;
  team?: string;
}

// Get all users
export const getUsers = async (req: GetUsersRequest, res: Response): Promise<void> => {
  const { role, team, sortOption } = req.query;

  const filters: Filters = {};

  if (role) filters.role = role;
  if (team) filters.team = team;

  let query = User.find(filters).select("-password");

  if (sortOption === "alphabetical") {
    query = query.sort({ name: 1 });
  } else if (sortOption === "oldest") {
    query = query.sort({ createdAt: 1 });
  } else {
    query = query.sort({ createdAt: -1 });
  }

  const users = await query.exec();
  res.status(200).json(users);
};

interface GetUserRequest extends Request {
  params: {
    userId: string;
  };
}

// Get a user by id
export const getUser = async (req: GetUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  res.status(200).send(user);
};

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role?: TRole;
    teams?: string[];
  };
  file?: Express.Multer.File | Express.MulterS3.File;
}

// Create a new user
export const createUser = async (req: CreateUserRequest, res: Response): Promise<void> => {
  const { name, email, role, teams } = req.body;

  if (!name || !email) {
    res.status(400).send({ message: "이름, 이메일은 필수 항목입니다." });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).send({ message: "이미 존재하는 이메일입니다." });
    return;
  }

  const newTeams = teams ?? [];

  const profileImageUrl = req.file
    ? (req.file as Express.MulterS3.File).location
    : process.env.DEFAULT_PROFILE_IMAGE_URL;

  const user = new User({
    name,
    email,
    password: "1234",
    role: role ?? "member",
    profileImage: profileImageUrl,
    teams: newTeams,
  });

  await user.save();
  res.status(201).send({ message: "새로운 사용자가 생성되었습니다.", user });
};

interface UpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: {
    name: string;
    email: string;
    role: TRole;
    teams: string[];
  };
  file?: Express.Multer.File | Express.MulterS3.File;
}

// Update a user by id
export const updateUser = async (req: UpdateUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const userInfo = await User.findById(userId);

  if (!userInfo) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  const { email, name, teams, role } = req.body;

  if (!(email || name)) {
    res.status(400).send({ message: "모든 필드값을 전송해주세요." });
    return;
  }

  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "이미 존재하는 이메일입니다." });
      return;
    }
  }

  userInfo.role = role;
  userInfo.name = name;
  userInfo.email = email;
  userInfo.teams = teams;

  if (req.file) {
    const profileImageUrl = (req.file as Express.MulterS3.File).location;

    userInfo.profileImage = profileImageUrl;
  }

  await userInfo.save();
  res.status(200).send({ message: "사용자 정보가 성공적으로 업데이트되었습니다." });
};

// Delete a user by id
export const deleteUser = async (req: GetUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
  }

  res.status(200).send({ message: "사용자가 삭제되었습니다." });
};

interface UpdateProfileImageRequest extends Request {
  user?: IUser;
  file?: Express.Multer.File | Express.MulterS3.File;
}

export const updateProfileImage = async (req: UpdateProfileImageRequest, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const profileImageUrl = (req.file as Express.MulterS3.File).location;

  if (!userId) {
    res.status(400).send({ message: "인증 토큰이 유효하지 않습니다." });
    return;
  }

  if (!profileImageUrl) {
    res.status(400).send({ message: "사진이 누락되었습니다." });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  await User.findByIdAndUpdate(userId, { profileImage: profileImageUrl });
  res.status(200).send({ message: "프로필 사진이 변경되었습니다." });
};

interface UpdateUserCredentialsRequest extends Request {
  user?: IUser;
  body: {
    currentPassword: string;
    newPassword: string;
  };
}

export const updateUserCredentials = async (req: UpdateUserCredentialsRequest, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    res.status(400).send({ message: "인증 토큰이 유효하지 않습니다." });
    return;
  }

  if (!currentPassword || !newPassword) {
    res.status(400).send({ message: "필수 정보가 누락되었습니다." });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  const isMatch = await compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(401).send({ message: "비밀번호가 일치하지 않습니다." });
    return;
  }

  user.password = newPassword;
  await user.save();

  res.status(200).send({ message: "비밀번호가 변경되었습니다." });
};
