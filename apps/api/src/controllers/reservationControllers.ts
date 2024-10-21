// import express, { type Router, type Request, type Response } from "express";
// import { reservationsMock } from "../mocks/reservationsMock";
// import { itemsMock } from "../mocks/itemsMock";
// import { type IReservation } from "@repo/types/reservations";

// const router: Router = express.Router();

// // 예약 전체 조회
// router.get("/", (req: Request, res: Response) => {
//   try {
//     // const reservations = await Reservation.find();
//     const reservations = reservationsMock;
//     res.status(200).json(reservations);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reservations", error });
//   }
// });

// // 특정 유저의 예약 조회
// router.get("/:id", (req: Request, res: Response) => {
//   try {
//     // todo test용 id
//     const userId = "2";
//     // const userId = getME.id
//     const userReservations = reservationsMock.filter((r) => r.userId === userId);
//     if (userReservations.length === 0) {
//       return res.status(404).json({ message: "No reservations assigned" });
//     }
//     res.status(200).json(userReservations);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user reservations", error });
//   }
// });

// // 아이템 타입 및 날짜에 대한 예약 조회
// router.get("/:itemType", (req: Request, res: Response) => {
//   try {
//     const { itemType } = req.params;
//     const { date } = req.query;

//     if (!date) {
//       return res.status(400).json({ message: "Date query parameter is required" });
//     }

//     // params로 받은 itemType에 해당하는 item의 id 추출
//     // const items = await item.find({ type: itemType }, "_id");
//     const items = itemsMock.filter((item) => item.type === itemType);
//     if (items.length === 0) {
//       return res.status(404).json({ message: "No reservations assigned to the item" });
//     }
//     const itemIds = items.map((item) => item._id);

//     // 타입가드
//     const dateString = typeof date === "string" ? date : String(date);

//     const targetDate = new Date(`${dateString}T00:00:00Z`);
//     const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
//     const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));

//     // 반환된 예약들 중 params의 날짜에 해당되는 예약 필터링
//     const reservations = reservationsMock.filter(
//       (reservation) =>
//         itemIds.includes(reservation.itemId) &&
//         ((reservation.startDate >= startOfDay && reservation.startDate <= endOfDay) ||
//           (reservation.endDate >= startOfDay && reservation.endDate <= endOfDay)),
//     );

//     res.status(200).json(reservations);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reservations by type and date", error });
//   }
// });

// // 특정 아이템에 대한 예약 생성
// // router.post("/:itemId", (req: Request, res: Response) => {
// //   try {
// //     const { itemId } = req.params;
// //     const newReservation: IReservation = {
// //       ...req.body,
// //       itemId,
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //     };
// //     reservationsMock.push(newReservation);
// //     res.status(201).json({ message: "Success creating reservation", newReservation });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error creating reservation", error });
// //   }
// // });

// // 특정 예약 수정
// router.patch("/:reservationId", (req: Request, res: Response) => {
//   try {
//     const { reservationId } = req.params;
//     const reservation = reservationsMock.find((r) => r._id === reservationId);
//     if (!reservation) return res.status(404).json({ message: "Reservation not found" });

//     Object.assign(reservation, req.body, { updatedAt: new Date() });
//     res.status(200).json(reservation);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating reservation", error });
//   }
// });

// // 특정 예약 삭제
// router.delete("/:reservationId", (req: Request, res: Response) => {
//   try {
//     const { reservationId } = req.params;
//     const reservationIndex = reservationsMock.findIndex((r) => r._id === reservationId);
//     if (reservationIndex === -1) return res.status(404).json({ message: "Reservation not found" });

//     reservationsMock.splice(reservationIndex, 1);
//     res.status(200).send("Reservation deleted");
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting reservation", error });
//   }
// });

// export default router;
