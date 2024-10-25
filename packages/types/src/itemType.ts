export const ItemStatus = ["available", "reserved", "in-use", "unavailable"] as const; // 예약가능, 예약됨, 대여중, 사용불가
export type TItemStatus = (typeof ItemStatus)[number];

export interface TBaseItem {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status: TItemStatus;
  description?: string;
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
}

export interface IEquipment extends TBaseItem {
  type: "equipment";
  category: string;
}
