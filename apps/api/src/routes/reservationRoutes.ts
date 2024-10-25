import asyncHandler from "express-async-handler";
import { Router } from "express";
import * as reservationController from "../controllers/reservationControllers";

const reservationRouter: Router = Router();

const { getUserReservations, getReservationsByTypeAndDate, createReservation, updateReservation, deleteReservation } =
  reservationController;

// 특정 유저의 예약 조회
reservationRouter.get("/dashboard/:userId", asyncHandler(getUserReservations));
// 아이템 타입 및 날짜에 대한 예약 조회 query: date (default: today)
reservationRouter.get("/:itemType", asyncHandler(getReservationsByTypeAndDate));

// 예약 CRUD
reservationRouter.post("/:itemId", asyncHandler(createReservation));
reservationRouter.patch("/:reservationId", asyncHandler(updateReservation));
reservationRouter.delete("/:reservationId", asyncHandler(deleteReservation));

export default reservationRouter;
