export type ReservationStatus = "reserved" | "cancelled" | "completed"; // 예약 상태

export interface Reservation {
  _id: string;
  user_id: string; // 예약한 사용자 ID (User의 _id)
  item_id: string; // 예약된 리소스 ID (Item의 _id)
  start_date: Date;
  end_date: Date;
  status: ReservationStatus;
  created_at: Date;
  updated_at: Date;
  notes?: string; // Optional
}
