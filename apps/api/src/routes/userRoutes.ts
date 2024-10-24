import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController";
import { upload } from "../utils/multerConfig";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();

// 유저 정렬
userRouter.get("/", asyncHandler(getUsers));
userRouter.get("/:userId", asyncHandler(getUser));

// 유저 정보 변경
// TODO : admin middleware 추가
userRouter.patch("/:userId/", upload.single("profileImage"), asyncHandler(updateUser));

// 유저 삭제
// TODO : admin middleware 추가
userRouter.delete("/:userId", asyncHandler(deleteUser));

// 유저 생성
// TODO : admin middleware 추가
userRouter.post("/create", upload.single("profileImage"), asyncHandler(createUser));

// 내정보 수정
// TODO : put?, patch? 어떤게 나은지?
// TODO : 나를 인증하는 방법이 있어야 구현 가능할듯?
// userRouter.patch("/me", asyncHandler(updateMe));

export default userRouter;
