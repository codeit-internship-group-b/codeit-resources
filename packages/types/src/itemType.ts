export const ItemStatus = ["available", "reserved", "in-use", "unavailable"] as const; // 예약가능, 예약됨, 대여중, 사용불가
export type TItemStatus = (typeof ItemStatus)[number];

export interface TBaseItem {
  _id: string;
  name: string;
  description: string;
  status: TItemStatus;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string; // Optional
}

export interface IRoom extends TBaseItem {
  type: "room";
  category: string;
  location?: string;
  capacity?: number;
}

export interface ISeat extends TBaseItem {
  type: "seat";
  userName?: string;
}

export interface IEquipment extends TBaseItem {
  type: "equipment";
  category: string;
}
