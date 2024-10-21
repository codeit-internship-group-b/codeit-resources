import { Router } from "express";
import userRouter from "./userRoutes";

const router: Router = Router();

router.use("/users", userRouter);

export default router;
