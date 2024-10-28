import { Router } from "express";
import asyncHandler from "express-async-handler";
import { signIn } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/", asyncHandler(signIn));

export default authRouter;
