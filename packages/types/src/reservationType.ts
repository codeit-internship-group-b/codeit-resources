export const ReservationStatus = ["reserved", "cancelled", "completed"] as const; // 예약됨, 취소, 완료
export type TReservationStatus = (typeof ReservationStatus)[number];

export type UserId = string;

export interface IReservation {
  _id: string;
  userId: UserId; // 예약한 사용자 ID (User의 id)
  itemId: string; // 예약된 리소스 ID (Item의 id)
  itemType: string;
  startAt: Date;
  endAt: Date;
  status: TReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string; // Optional
  attendees?: UserId[]; // Optional 참여자 ID (User의 id)
}
