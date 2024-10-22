export const ItemStatus = ["available", "reserved", "in-use", "unavailable"] as const; // 예약가능, 예약됨, 대여중, 사용불가
type TItemStatus = (typeof ItemStatus)[number];

export const ItemTypes = ["seat", "room", "equipment"] as const;
type TItemType = (typeof ItemTypes)[number];

export interface IItem {
  _id: string;
  name: string;
  type: TItemType;
  description: string;
  status: TItemStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // 리소스를 등록한 관리자 ID (User의 id)
  category?: string; // 회의실인 경우 필수
  location?: string; // Optional
  imageUrl?: string; // Optional
  tags?: string[]; // Optional
  capacity?: number; // 회의실인 경우 필수
}
