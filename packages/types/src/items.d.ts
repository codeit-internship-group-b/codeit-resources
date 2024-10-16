export type ItemStatus = "available" | "reserved" | "in-use" | "unavailable"; // 예약가능, 예약됨, 대여중, 사용불가

export type ItemType = "seat" | "room" | "equipment";

export interface TItem {
  _id: string;
  name: string;
  type: ItemType;
  description: string;
  location?: string;
  status: ItemStatus;
  created_at: Date;
  updated_at: Date;
  created_by: string; // 리소스를 등록한 관리자 ID (User의 _id)
  image_url?: string; // Optional
  tags?: string[]; // Optional
  capacity?: number;
}
