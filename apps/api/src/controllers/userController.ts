// import { type NextFunction, type Request as ExpressRequest, type Response } from "express";
// import bcrypt from "bcryptjs";
// import { type IUser } from "@repo/types";
// import usersMock from "../mocks/usersMock";

// interface Request extends ExpressRequest {
//   user?: IUser;
// }

// // Get all users
// // const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// //   try {
// //     // Use usersMock instead of querying the database
// //     const users = usersMock.map(({ password, ...user }) => user);
// //     res.status(200).send(users);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const users = await User.find().select("-password");
//     res.status(200).send(users);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get a user by id
// const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id).select("-password");

//     if (!user) {
//       res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
//       return;
//     }

//     res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // Create a new user
// // admin 권한 필요
// const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { role } = req.user as TUser;
//     if (role !== "admin") {
//       res.status(403).send({ message: "권한이 없습니다." });
//       return;
//     }

//     const user = new User(req.body);
//     await user.save();

//     res.status(201).send({ message: "새로운 사용자가 생성되었습니다." });
//   } catch (error) {
//     next(error);
//   }
// };

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

// export { getUsers, getUser, createUser, updateUser, deleteUser, updatePassword, updateProfileImage };
