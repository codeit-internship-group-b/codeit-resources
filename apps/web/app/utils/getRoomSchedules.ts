import { type IReservation } from "@repo/types/src/reservationType";
import { type TBaseItem } from "@repo/types";

export function getRoomSchedules(room: TBaseItem, meetingsData: IReservation[], selectedDate: string): IReservation[] {
  return meetingsData.filter((schedule) => {
    const scheduleItemId = typeof schedule.item === "string" ? schedule.item : schedule.item._id;

    const isSameRoom = scheduleItemId === room._id;

    const scheduleDate = new Date(schedule.startAt).toISOString().split("T")[0];
    const isSameDate = scheduleDate === selectedDate;

    return isSameRoom && isSameDate;
  });
}
