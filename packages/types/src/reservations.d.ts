export type ReservationStatus = "reserved" | "cancelled" | "completed"; // 예약 상태

export interface TReservation {
  id: string;
  userId: string; // 예약한 사용자 ID (User의 id)
  itemId: string; // 예약된 리소스 ID (Item의 id)
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string; // Optional
}
