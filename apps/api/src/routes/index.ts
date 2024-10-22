import { Router } from "express";
import userRouter from "./userRoutes";
import reservationRouter from "./reservationRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/reservations", reservationRouter);

export default router;
