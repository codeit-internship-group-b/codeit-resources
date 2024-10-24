const ItemStatus = ["available", "reserved", "in-use", "unavailable"] as const;
type TItemStatus = (typeof ItemStatus)[number];

const ItemType = ["seat", "room", "equipment"] as const;
type TItem = (typeof ItemType)[number];

interface IItems {
  id: string;
  name: string;
  type: TItem;
  description: string;
  userName?: string;
  status: TItemStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // 리소스를 등록한 관리자 ID (User의 id)
  imageUrl?: string; // Optional
  tags?: string[]; // Optional
  capacity?: number;
}

export const seatsMock: IItems[] = [
  {
    id: "A1",
    name: "A1",
    type: "seat",
    description: "고정된 좌석",
    userName: "김현학",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "A2",
    name: "A2",
    type: "seat",
    description: "고정된 좌석",
    userName: "황준우",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "A3",
    name: "A3",
    type: "seat",
    description: "고정된 좌석",
    userName: "이준기",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "A4",
    name: "A4",
    type: "seat",
    description: "고정된 좌석",
    userName: "김윤미",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B1",
    name: "B1",
    type: "seat",
    description: "고정된 좌석",
    userName: "박건우",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B2",
    name: "B2",
    type: "seat",
    description: "고정된 좌석",
    userName: "박태건",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B3",
    name: "B3",
    type: "seat",
    description: "고정된 좌석",
    userName: "안가영",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B4",
    name: "B4",
    type: "seat",
    description: "고정된 좌석",
    userName: "김시온",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B5",
    name: "B5",
    type: "seat",
    description: "고정된 좌석",
    userName: "정유진",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C1",
    name: "C1",
    type: "seat",
    description: "고정된 좌석",
    userName: "정승호",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C2",
    name: "C2",
    type: "seat",
    description: "고정된 좌석",
    userName: "최익중",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C3",
    name: "C3",
    type: "seat",
    description: "고정된 좌석",
    userName: "박소정",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C4",
    name: "C4",
    type: "seat",
    description: "고정된 좌석",
    userName: "노유정",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C5",
    name: "C5",
    type: "seat",
    description: "고정된 좌석",
    userName: "문동우",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D1",
    name: "D1",
    type: "seat",
    description: "고정된 좌석",
    userName: "이다현",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D2",
    name: "D2",
    type: "seat",
    description: "고정된 좌석",
    userName: "홍성륜",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D3",
    name: "D3",
    type: "seat",
    description: "고정된 좌석",
    userName: "이채빈",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D4",
    name: "D4",
    type: "seat",
    description: "고정된 좌석",
    userName: "김민영",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D5",
    name: "D5",
    type: "seat",
    description: "고정된 좌석",
    userName: "김나연",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D6",
    name: "D6",
    type: "seat",
    description: "고정된 좌석",
    userName: "서혜선",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D7",
    name: "D7",
    type: "seat",
    description: "고정된 좌석",
    userName: "이시형",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D8",
    name: "D8",
    type: "seat",
    description: "고정된 좌석",
    userName: "박혜지",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D9",
    name: "D9",
    type: "seat",
    description: "고정된 좌석",
    userName: "조수진",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D10",
    name: "D10",
    type: "seat",
    description: "고정된 좌석",
    userName: "조호성",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H4",
    name: "H4",
    type: "seat",
    description: "고정된 좌석",
    userName: "Ayden",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H5",
    name: "H5",
    type: "seat",
    description: "고정된 좌석",
    userName: "이유정",
    status: "in-use",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },

  {
    id: "H6",
    name: "H6",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H7",
    name: "H7",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H8",
    name: "H8",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H9",
    name: "H9",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "H10",
    name: "H10",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "J1",
    name: "J1",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "J2",
    name: "J2",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "J3",
    name: "J3",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "J4",
    name: "J4",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "J5",
    name: "J5",
    type: "seat",
    description: "사용 불가한 좌석",
    status: "unavailable",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },

  // Available seats (default)
  {
    id: "A5",
    name: "A5",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "B6",
    name: "B6",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C6",
    name: "C6",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C7",
    name: "C7",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C8",
    name: "C8",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C9",
    name: "C9",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "C10",
    name: "C10",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "D6",
    name: "D6",
    type: "seat",
    description: "사용 가능한 좌석",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
  },
];