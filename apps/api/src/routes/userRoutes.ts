import { Router } from "express";
// import * as userController from "../controllers/userController";
// import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

const userRouter: Router = Router();
// const { getUsers, getUser, createUser, updateUser, deleteUser } = userController;

// userRouter.get("/", getUsers);
// userRouter.get("/:id", getUser);
// userRouter.post("/create", adminCheckMiddleware, createUser);
// userRouter.put("/:id", adminCheckMiddleware, updateUser);
// userRouter.delete("/:id", adminCheckMiddleware, deleteUser);

export default userRouter;
