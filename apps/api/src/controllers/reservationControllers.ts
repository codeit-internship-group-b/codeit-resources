import express, { Router } from "express";
import { rooms } from "./roomController";

const router: Router = express.Router();

// Mock 데이터
export let reservations = [
  {
    id: "1",
    userId: "user1",
    itemId: "1",
    startDate: new Date("2024-10-20T09:00:00"),
    endDate: new Date("2024-10-20T10:00:00"),
    status: "reserved",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user2",
    itemId: "2",
    startDate: new Date("2024-10-21T14:00:00"),
    endDate: new Date("2024-10-21T15:00:00"),
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 예약 전체 조회
router.get("/", (req, res) => {
  res.status(200).json(reservations);
});

// 내 예약 조회
router.get("/me", (req, res) => {
  // todo 현재 로그인된 사용자의 userId 필요, 타입 어떻게 할건지..
  const userId = "2";
  const userReservations = reservations.filter((r) => r.userId === userId);
  res.status(200).json(userReservations);
});

// 아이템 타입 및 날짜에 대한 예약 조회
router.get("/:itemType", (req, res) => {
  const { itemType } = req.params;
  const { date } = req.query;

  // date 문자열 변환, 검사
  const filteredReservations = reservations.filter((r) => {
    const item = rooms.find((room) => room.id === r.itemId);
    const isTypeMatch = item && item.status === itemType;
    const isDateMatch =
      !date || (typeof date === "string" && new Date(date).toDateString() === r.startDate.toDateString());
    return isTypeMatch && isDateMatch;
  });

  res.status(200).json(filteredReservations);
});

// 특정 아이템에 대한 예약 생성
router.post("/:itemId", (req, res) => {
  const { itemId } = req.params;
  const newReservation = {
    ...req.body,
    id: (reservations.length + 1).toString(),
    itemId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// 특정 예약 수정
router.patch("/:reservationId", (req, res) => {
  const { reservationId } = req.params;
  const reservation = reservations.find((r) => r.id === reservationId);
  if (!reservation) return res.status(404).send("Reservation not found");
  Object.assign(reservation, req.body, { updatedAt: new Date() });
  res.status(200).json(reservation);
});

// 특정 예약 삭제
router.delete("/:reservationId", (req, res) => {
  const { reservationId } = req.params;
  reservations = reservations.filter((r) => r.id !== reservationId);
  res.status(200).send("Reservation deleted");
});

export default router;
