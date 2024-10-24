import { type Request, type Response } from "express";
import { type TRole } from "@repo/types/userType";
import { config } from "dotenv";
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
  const { name, email, password, role, teams } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: "이름, 이메일, 비밀번호는 필수 항목입니다." });
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
    password,
    role: role ?? "member",
    profileImage: profileImageUrl,
    teams: newTeams,
  });

  await user.save();
  res.status(201).send({ message: "새로운 사용자가 생성되었습니다." });
};

interface UpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: {
    name?: string;
    email?: string;
    role: TRole;
    teams?: string[];
  };
  file?: Express.Multer.File | Express.MulterS3.File;
}

// Update a user by id
export const updateUser = async (req: UpdateUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const targetUser = await User.findById(userId);

  if (!targetUser) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  const { email, name, teams, role } = req.body;

  targetUser.role = role;
  if (name) targetUser.name = name;
  if (teams) targetUser.teams = teams;
  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "이미 존재하는 이메일입니다." });
      return;
    }

    targetUser.email = email;
  }

  if (req.file) {
    const profileImageUrl = (req.file as Express.MulterS3.File).location;

    targetUser.profileImage = profileImageUrl;
  }

  await targetUser.save();
  res.status(200).send({ message: "사용자 정보가 성공적으로 업데이트되었습니다." });
};

// Delete a user by id
export const deleteUser = async (req: GetUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);

  res.status(200).send({ message: "사용자가 삭제되었습니다." });
};

// interface UpdateMeRequest extends Request {
//   body?: {
//     password: string
//   },
//   file?: Express.Multer.File | Express.MulterS3.File;
// }

// export const updateMe = async (req:UpdateMeRequest, res: Response): Promise<void> => {
//   const me =
// }
