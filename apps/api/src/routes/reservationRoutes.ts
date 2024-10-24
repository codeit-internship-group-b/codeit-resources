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

// 특정 아이템에 대한 예약 생성
reservationRouter.post("/:itemId", asyncHandler(createReservation));

// 특정 예약 수정
reservationRouter.patch("/:reservationId", asyncHandler(updateReservation));

// 특정 예약 삭제(삭제보다는 update로 cancelled 상태로 전환)
reservationRouter.delete("/:reservationId", asyncHandler(deleteReservation));

export default reservationRouter;