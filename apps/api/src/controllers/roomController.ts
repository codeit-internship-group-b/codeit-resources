import express, { Router } from "express";
const router: Router = express.Router();

let rooms = [
  {
    id: "1",
    name: "회의실1",
    description: "큰 회의실",
    location: "2층",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "회의실2",
    description: "작은 회의실",
    location: "3층",
    status: "reserved",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 회의실 아이템 목록 조회
router.get("/", (req, res) => {
  res.status(200).json(rooms);
});

// 회의실 아이템 추가
router.post("/", (req, res) => {
  const newRoom = { ...req.body, id: (rooms.length + 1).toString(), createdAt: new Date(), updatedAt: new Date() };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// 회의실 아이템 정보 수정
router.patch("/:itemId", (req, res) => {
  const { itemId } = req.params;
  const room = rooms.find((r) => r.id === itemId);
  if (!room) return res.status(404).send("Room not found");
  Object.assign(room, req.body, { updatedAt: new Date() });
  res.status(200).json(room);
});

// 회의실 아이템 삭제
router.delete("/:itemId", (req, res) => {
  const { itemId } = req.params;
  rooms = rooms.filter((r) => r.id !== itemId);
  res.status(200).send("Room deleted");
});

export default router;
