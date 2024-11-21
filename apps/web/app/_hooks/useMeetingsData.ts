import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type IReservation } from "@repo/types/src/reservationType";
import { getReservationsByTypeAndDate } from "@/api/reservations";
import { MEETING_ROOMS_TYPE } from "../constants/meetingRoomsType";

export const useMeetingsData = (itemType: string, date: string): UseQueryResult => {
  return useQuery<IReservation[]>({
    queryKey: ["meetings", date, itemType],
    queryFn: () => getReservationsByTypeAndDate({ itemType: MEETING_ROOMS_TYPE, date }),
  });
};
