import { IEquipment, IRoom, ISeat } from "./itemType";
import { IUser } from "./userType";

export const ReservationStatus = ["reserved", "canceled", "completed"] as const; // 예약됨, 취소, 완료
export type TReservationStatus = (typeof ReservationStatus)[number];

export interface IReservation {
  _id: string;
  user: IUser; // 예약한 사용자 (User)
  item: string | IRoom | ISeat | IEquipment; // 예약된 리소스 (Item)
  itemType: "room" | "seat" | "equipment";
  startAt: Date;
  endAt: Date;
  status: TReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string; // Optional
  attendees?: IUser[]; // Optional 참여자 (User)
}
