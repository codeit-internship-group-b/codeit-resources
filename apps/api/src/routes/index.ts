import { Router } from "express";
import userRouter from "./userRoutes";
import reservationRouter from "./reservationRoutes";
import { itemRouter } from "./itemRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/reservations", reservationRouter);
router.use("/items", itemRouter);

export default router;
