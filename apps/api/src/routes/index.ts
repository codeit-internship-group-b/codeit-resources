import { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/", authRouter);

export default router;
