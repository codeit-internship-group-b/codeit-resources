import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfileImage,
  updateUserCredentials,
} from "../controllers/userController";
import { upload } from "../utils/multerConfig";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();

// 유저 정렬
userRouter.get("/", asyncHandler(getUsers));
userRouter.get("/:userId", asyncHandler(getUser));

// 유저 정보 변경
// TODO : admin middleware 추가
userRouter.put("/:userId/", upload.single("profileImage"), asyncHandler(updateUser));

// 유저 삭제
// TODO : admin middleware 추가
userRouter.delete("/:userId", asyncHandler(deleteUser));

// 유저 생성
// TODO : admin middleware 추가
userRouter.post("/create", upload.single("profileImage"), asyncHandler(createUser));

// 내 사진 변경
userRouter.patch("/me/image", upload.single("profileImage"), asyncHandler(updateProfileImage));

// 비밀변호 변경
userRouter.patch("/me/password", asyncHandler(updateUserCredentials));

export default userRouter;
