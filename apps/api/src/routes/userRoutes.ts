import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, getUser } from "../controllers/userController";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();

userRouter.get("/", asyncHandler(getUsers));
userRouter.get("/:userId", asyncHandler(getUser));
// userRouter.post("/create", adminCheckMiddleware, createUser);
// userRouter.put("/:id", adminCheckMiddleware, updateUser);
// userRouter.delete("/:id", adminCheckMiddleware, deleteUser);

export default userRouter;
