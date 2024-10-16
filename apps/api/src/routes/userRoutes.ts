import { Router } from "express";
import * as userController from "../controllers/userController";

const JWT_SECRET = process.env.JWT_SECRET as string;

const userRouter: Router = Router();

// userRouter.route("/").get(userController.getUsers);

// userRouter.route("/:id").get(userController.getUser).patch(userController.updateUser);

// userRouter.route("/:id/password").patch(userController.updatePassword);

// userRouter.route("/:id/profile-image").patch(userController.updateProfileImage);

// userRouter
//   .route("/")
//   .get((req, res, next) => {
//     res.send({ message: "사용자 목록 보기" });
//   })
//   .post((req, res, next) => {
//     res.send({ message: "사용자 추가하기" });
//   });

// userRouter
//   .route("/:id")
//   .patch((req, res, next) => {
//     res.send({ message: "사용자 수정하기" });
//   })
//   .delete((req, res, next) => {
//     res.send({ message: "사용자 삭제하기" });
//   });

// function adminOnly(req, res, next) {
//   // const authorization = req.get("Authorization");
//   // if (authorization) {
//   //   next();
//   // } else {
//   //   res.status(401).send({ message: "권한이 없습니다" });
//   // }
// }

export default userRouter;
