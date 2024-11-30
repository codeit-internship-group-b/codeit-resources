import { type StaticImageData, type StaticRequire } from "next/dist/shared/lib/get-img-props";

export type SeatStatus = "in-use" | "unavailable" | "available" | "reserved";

export interface Seat {
  seatNum: string;
  status: SeatStatus;
  itemId: string;
  user: string | null;
}

export interface SelectedMember {
  id: string | undefined;
  name: string | undefined;
  profileImage: string | StaticRequire | StaticImageData | null;
}

export interface AdminSeatSettingFormValues {
  name: string;
  status: SeatStatus;
  user: SelectedMember[] | null;
}
