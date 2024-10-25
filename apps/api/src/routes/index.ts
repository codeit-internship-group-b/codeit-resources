import { Router } from "express";
import userRouter from "./userRoutes";
import reservationRouter from "./reservationRoutes";
import { equipmentRouter, roomRouter, seatRouter } from "./itemRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/reservations", reservationRouter);
router.use("/rooms", roomRouter);
router.use("/seats", seatRouter);
router.use("/equipments", equipmentRouter);

export default router;
