import express, { Router, Request, Response } from "express";
import { rooms } from "./roomController";

const router: Router = express.Router();

// Mock 데이터
export let reservations = [
  {
    _id: "1",
    userId: "1",
    itemId: "1",
    startDate: "2024-10-20T09:00:00",
    endDate: "2024-10-20T10:00:00",
    status: "reserved",
    createdAt: "2024-10-10T08:00:00",
    updatedAt: "2024-10-10T08:00:00",
    notes: "프로젝트 회의",
  },
  {
    _id: "2",
    userId: "2",
    itemId: "2",
    startDate: "2024-10-17T11:00:00",
    endDate: "2024-10-17T15:00:00",
    status: "completed",
    createdAt: "2024-10-12T09:00:00",
    updatedAt: "2024-10-12T09:00:00",
    notes: "프론트엔드 프로덕트 팀 미팅",
  },
  {
    _id: "3",
    userId: "4",
    itemId: "3",
    startDate: "2024-10-17T11:00:00",
    endDate: "2024-10-17T15:00:00",
    status: "cancelled",
    createdAt: "2024-10-12T09:00:00",
    updatedAt: "2024-10-12T09:00:00",
    notes: "팀 회고",
  },
];

// 예약 전체 조회
router.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});

// 특정 유저의 예약 조회
router.get("/:id", (req: Request, res: Response) => {
  try {
    // todo test용 id
    const userId = "2";
    // const userId = getME.id
    const userReservations = reservations.filter((r) => r.userId === userId);
    if (userReservations.length === 0) {
      return res.status(404).json({ message: "No reservations assigned" });
    }
    res.status(200).json(userReservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reservations", error });
  }
});

// 아이템 타입 및 날짜에 대한 예약 조회
router.get("/:itemType", (req: Request, res: Response) => {
  try {
    const { itemType } = req.params;
    const { date } = req.query;

    // items 데이터에서 itemType으로 필터
    // 해당 itemId로 reservations 필터

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations by type and date", error });
  }
});

// 특정 아이템에 대한 예약 생성
router.post("/:itemId", (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const newReservation = {
      ...req.body,
      itemId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    reservations.push(newReservation);
    res.status(201).json({ message: "Success creating reservation", newReservation });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
});

// 특정 예약 수정
router.patch("/:reservationId", (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const reservation = reservations.find((r) => r._id === reservationId);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    Object.assign(reservation, req.body, { updatedAt: new Date() });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
});

// 특정 예약 삭제
router.delete("/:reservationId", (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const reservationIndex = reservations.findIndex((r) => r._id === reservationId);
    if (reservationIndex === -1) return res.status(404).json({ message: "Reservation not found" });

    reservations.splice(reservationIndex, 1);
    res.status(200).send("Reservation deleted");
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
});

export default router;
