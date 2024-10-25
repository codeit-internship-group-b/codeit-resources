import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authenticateToken } from "../middleware/authenticateToken";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import reservationRouter from "./reservationRoutes";
import { itemRouter } from "./itemRoutes";

const router: Router = Router();

router.use("/sign-in", authRouter);
router.use("/users", asyncHandler(authenticateToken), userRouter);
router.use("/reservations", asyncHandler(authenticateToken), reservationRouter);
router.use("/items", asyncHandler(authenticateToken), itemRouter);

export default router;
