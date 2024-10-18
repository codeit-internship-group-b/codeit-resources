import { IUser } from "@repo/types/users";
import { Types } from "mongoose";

const usersMock: Partial<IUser>[] = [
  {
    _id: new Types.ObjectId(),
    username: "김철수",
    email: "chulsoo.kim@example.com",
    password: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXX", // 실제 해시된 비밀번호
    role: "member",
    profileImage: "https://example.com/profiles/chulsoo.jpg",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    _id: new Types.ObjectId(),
    username: "이영희",
    email: "younghee.lee@example.com",
    password: "$2a$10$YYYYYYYYYYYYYYYYYYYYYYYY", // 실제 해시된 비밀번호
    role: "member",
    profileImage: "https://example.com/profiles/younghee.jpg",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    _id: new Types.ObjectId(),
    username: "박민수",
    email: "minsoo.park@example.com",
    password: "$2a$10$ZZZZZZZZZZZZZZZZZZZZZZZZ", // 실제 해시된 비밀번호
    role: "admin",
    profileImage: "https://example.com/profiles/minsoo.jpg",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    _id: new Types.ObjectId(),
    username: "정다은",
    email: "daeun.jung@example.com",
    password: "$2a$10$WWWWWWWWWWWWWWWWWWWWWWWW", // 실제 해시된 비밀번호
    role: "admin",
    profileImage: "https://example.com/profiles/daeun.jpg",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    _id: new Types.ObjectId(),
    username: "홍길동",
    email: "gildong.hong@example.com",
    password: "$2a$10$VVVVVVVVVVVVVVVVVVVVVVVV", // 실제 해시된 비밀번호
    role: "admin",
    profileImage: "https://example.com/profiles/gildong.jpg",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
];

export default usersMock;
