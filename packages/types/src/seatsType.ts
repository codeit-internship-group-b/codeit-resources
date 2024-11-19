import { type StaticImageData, type StaticRequire } from "next/dist/shared/lib/get-img-props";

export interface Seat {
  seatNum: string;
  status: "in-use" | "unavailable" | "available" | "reserved";
  itemId: string;
  user: string | null;
}

export interface SelectedMember {
  id: string | undefined;
  name: string | undefined;
  profileImage: string | StaticRequire | StaticImageData | undefined | null;
}

export interface AdminSeatSettingFormValues {
  name: string;
  status: "in-use" | "unavailable" | "available" | "reserved";
  user: SelectedMember[] | null;
}
