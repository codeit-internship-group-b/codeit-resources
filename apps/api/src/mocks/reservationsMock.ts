import { IReservation } from "@repo/types/reservations";

export const reservationsMock: IReservation[] = [
  {
    _id: "1",
    userId: "user1",
    itemId: "room1",
    startDate: new Date("2024-10-20T09:00:00Z"),
    endDate: new Date("2024-10-20T10:00:00Z"),
    status: "reserved", // 문자열 그대로 사용
    notes: "Project meeting",
    createdAt: new Date("2024-10-10T08:00:00Z"),
    updatedAt: new Date("2024-10-10T08:00:00Z"),
  },
  {
    _id: "2",
    userId: "user2",
    itemId: "seat1",
    startDate: new Date("2024-10-17T11:00:00Z"),
    endDate: new Date("2024-10-17T13:00:00Z"),
    status: "completed", // 문자열 그대로 사용
    notes: "Frontend team sync",
    createdAt: new Date("2024-10-12T09:00:00Z"),
    updatedAt: new Date("2024-10-12T09:00:00Z"),
  },
  {
    _id: "3",
    userId: "user3",
    itemId: "equipment1",
    startDate: new Date("2024-10-18T14:00:00Z"),
    endDate: new Date("2024-10-18T16:00:00Z"),
    status: "cancelled", // 문자열 그대로 사용
    notes: "Photography session canceled",
    createdAt: new Date("2024-10-15T12:00:00Z"),
    updatedAt: new Date("2024-10-15T12:00:00Z"),
  },
  {
    _id: "4",
    userId: "user4",
    itemId: "room2",
    startDate: new Date("2024-10-21T10:00:00Z"),
    endDate: new Date("2024-10-21T12:00:00Z"),
    status: "reserved", // 문자열 그대로 사용
    notes: "Management meeting",
    createdAt: new Date("2024-10-16T08:00:00Z"),
    updatedAt: new Date("2024-10-16T08:00:00Z"),
  },
  {
    _id: "5",
    userId: "user5",
    itemId: "seat2",
    startDate: new Date("2024-10-22T09:00:00Z"),
    endDate: new Date("2024-10-22T11:00:00Z"),
    status: "reserved", // 문자열 그대로 사용
    notes: "One-on-one meeting",
    createdAt: new Date("2024-10-18T09:00:00Z"),
    updatedAt: new Date("2024-10-18T09:00:00Z"),
  },
];
