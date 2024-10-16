export type ItemStatus = "available" | "reserved" | "rented"; // 예약가능, 예약됨, 대여중

export interface TItem {
  _id: string;
  name: string;
  description: string;
  status: ItemStatus;
  created_at: Date;
  updated_at: Date;
  created_by: string; // 리소스를 등록한 관리자 ID (User의 _id)
  image_url?: string; // Optional
  tags?: string[]; // Optional
}
