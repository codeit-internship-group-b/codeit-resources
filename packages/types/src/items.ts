export const ItemStatus = ["available", "reserved", "in-use", "unavailable"] as const; // 예약가능, 예약됨, 대여중, 사용불가
export type TItemStatus = (typeof ItemStatus)[number];

export const ItemType = ["seat", "room", "equipment"] as const;
export type TItem = (typeof ItemType)[number];

export interface IItems {
  _id: string;
  name: string;
  type: TItem;
  description: string;
  location?: string;
  status: TItemStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // 리소스를 등록한 관리자 ID (User의 id)
  imageUrl?: string; // Optional
  tags?: string[]; // Optional
  capacity?: number;
}
