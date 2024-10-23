import { type Request, type Response } from "express";
import { hash } from "bcryptjs";
import { type TRole } from "@repo/types/userType";
import { User } from "../models/userModel";

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

interface GetUserRequest extends Request {
  params: {
    userId: string;
  };
}

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

  const newTeams: string[] = [];

  if (teams) newTeams.push(...teams);

  const hashedPassword = await hash(password, 10);

  const profileImageUrl = (req.file as Express.MulterS3.File).location || process.env.DEFAULT_PROFILE_IMAGE_URL;

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role ?? "member",
    profileImage: profileImageUrl,
    teams: newTeams,
  });

  await user.save();
  res.status(201).send({ message: "새로운 사용자가 생성되었습니다." });
};

// // Update a user by id
// // admin 권한 필요
// const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
//       return;
//     }

//     user.username = req.body.username;
//     user.email = req.body.email;
//     user.role = req.body.role;
//     await user.save();

//     res.status(200).send({ message: "사용자 정보가 성공적으로 업데이트되었습니다." });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     await User.findByIdAndDelete(id);

//     res.status(200).send({ message: "사용자가 삭제되었습니다." });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update a user password
// const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
//       return;
//     }

//     const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
//     if (!isPasswordValid) {
//       res.status(400).send({ message: "현재 비밀번호가 일치하지 않습니다." });
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).send({ message: "비밀번호가 성공적으로 변경되었습니다." });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateProfileImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { profileImage } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
//       return;
//     }

//     user.profileImage = profileImage;
//     await user.save();

//     res.status(200).send({ message: "프로필 이미지가 성공적으로 업데이트되었습니다." });
//   } catch (error) {
//     next(error);
//   }
// };
