import express, { Router, Request, Response } from "express";
import { rooms } from "./roomController";
import { reservationsMock } from "../mocks/reservationsMock";

const router: Router = express.Router();

// 예약 전체 조회
router.get("/", async (req: Request, res: Response) => {
  try {
    // const reservations = await Reservation.find();
    const reservations = reservationsMock;
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
    const userReservations = reservationsMock.filter((r) => r.userId === userId);
    if (userReservations.length === 0) {
      return res.status(404).json({ message: "No reservations assigned" });
    }
    res.status(200).json(userReservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reservations", error });
  }
});

// 아이템 타입 및 날짜에 대한 예약 조회
// router.get("/:itemType", async (req: Request, res: Response) => {
//   try {
//     const { itemType } = req.params;
//     const { date } = req.query;

//     if (!date) {
//       return res.status(400).json({ message: "Date query parameter is required" });
//     }

//     // 날짜 변환
//     const targetDate = new Date(date as string);
//     const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)); // 그날의 00:00:00
//     const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)); // 그날의 23:59:59

//     // MongoDB에서 startDate나 endDate가 해당 날짜 범위에 포함되는지 확인
//     // const reservations = await reservationsMock.find({
//     //   $or: [{ startDate: { $gte: startOfDay, $lte: endOfDay } }, { endDate: { $gte: startOfDay, $lte: endOfDay } }],
//     // });

//     res.status(200).json(reservations);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reservations by type and date", error });
//   }
// });

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
    reservationsMock.push(newReservation);
    res.status(201).json({ message: "Success creating reservation", newReservation });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
});

// 특정 예약 수정
router.patch("/:reservationId", (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const reservation = reservationsMock.find((r) => r._id === reservationId);
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
    const reservationIndex = reservationsMock.findIndex((r) => r._id === reservationId);
    if (reservationIndex === -1) return res.status(404).json({ message: "Reservation not found" });

    reservationsMock.splice(reservationIndex, 1);
    res.status(200).send("Reservation deleted");
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
});

export default router;
