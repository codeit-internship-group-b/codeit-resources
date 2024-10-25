import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as roomController from "../controllers/roomControllers";

export const roomRouter: Router = Router();
const { getAllRooms, createRoom, updateRoom, deleteRoom } = roomController;

// 전체 회의실 리스트 조회
roomRouter.get("/", asyncHandler(getAllRooms));
// 신규 회의실 등록
roomRouter.post("/", asyncHandler(createRoom));
// 회의실 정보 수정
roomRouter.patch("/:itemId", asyncHandler(updateRoom));
// 회의실 삭제
roomRouter.delete("/:itemId", asyncHandler(deleteRoom));

export const seatRouter: Router = Router();

export const equipmentRouter: Router = Router();
