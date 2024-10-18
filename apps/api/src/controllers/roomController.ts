import express, { Router } from "express";

const router: Router = express.Router();

// mock
export let rooms = [
  {
    _id: "1",
    name: "회의실 A",
    type: "room",
    description: "큰 회의실",
    location: "2층",
    status: "available",
    createdAt: "2024-10-01T09:00:00",
    updatedAt: "2024-10-01T09:00:00",
    createdBy: "1",
    imageUrl: "",
    tags: ["회의실", "대형"],
    capacity: 20,
  },
  {
    _id: "2",
    name: "회의실 B",
    type: "room",
    description: "작은 회의실",
    location: "3층",
    status: "reserved",
    createdAt: "2024-10-02T10:00:00",
    updatedAt: "2024-10-02T11:00:00",
    createdBy: "2",
    imageUrl: "",
    tags: ["회의실", "소형"],
    capacity: 4,
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
  const room = rooms.find((r) => r._id === itemId);
  if (!room) return res.status(404).send("Room not found");
  Object.assign(room, req.body, { updatedAt: new Date() });
  res.status(200).json(room);
});

// 회의실 아이템 삭제
router.delete("/:itemId", (req, res) => {
  const { itemId } = req.params;
  rooms = rooms.filter((r) => r._id !== itemId);
  res.status(200).send("Room deleted");
});

export default router;
