import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, getUser, createUser } from "../controllers/userController";
import { upload } from "../utils/multerConfig";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();

// 멤버 정렬
userRouter.get("/", asyncHandler(getUsers));
userRouter.get("/:userId", asyncHandler(getUser));

// 권한 변경
// 권한 변경 router

// 멤버 추가
// TODO: admin middleware 추가
// TODO: s3 url middleware 추가
userRouter.post("/create", upload.single("profileImage"), asyncHandler(createUser));

// userRouter.put("/:id", adminCheckMiddleware, updateUser);
// userRouter.delete("/:id", adminCheckMiddleware, deleteUser);

export default userRouter;
