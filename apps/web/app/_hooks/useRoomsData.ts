import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type TBaseItem } from "@repo/types";
import { getAllItems } from "@/api/items";
import { MEETING_ROOMS_TYPE } from "../constants/meetingRoomsType";

export const useRoomsData = (itemType: string): UseQueryResult => {
  return useQuery<TBaseItem[]>({
    queryKey: ["Rooms", itemType],
    queryFn: () => getAllItems({ itemType: MEETING_ROOMS_TYPE }),
  });
};
