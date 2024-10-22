import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, getUser, createUser } from "../controllers/userController";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();

// 멤버 정렬
userRouter.get("/", asyncHandler(getUsers));
userRouter.get("/:userId", asyncHandler(getUser));

// 권한 변경
// 권한 변경 router

// 멤버 추가
// TODO: admin middleware 추가
userRouter.post("/create", asyncHandler(createUser));

// userRouter.put("/:id", adminCheckMiddleware, updateUser);
// userRouter.delete("/:id", adminCheckMiddleware, deleteUser);

export default userRouter;
