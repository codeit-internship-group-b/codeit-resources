/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { type IReservation, type IEquipment, type IRoom, type ISeat } from "@repo/types";

// 좌석 예약되어있는지 확인 (타입 가드)
export function isSeatReserved(reservedData: IReservation[] | undefined): boolean {
  if (Array.isArray(reservedData)) {
    return reservedData.some((item) => item.itemType === "seat");
  }
  return false;
}

// 좌석인지 아닌지 (타입 가드)
export function isSeat(item: string | IRoom | ISeat | IEquipment): item is ISeat {
  return typeof item === "object" && item !== null && "name" in item;
}
