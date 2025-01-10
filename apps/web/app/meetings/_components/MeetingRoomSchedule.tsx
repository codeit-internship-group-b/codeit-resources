"use client";

import { type IReservation, type TBaseItem } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { useDateStore } from "@/app/store/useDateStore";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { formatDate } from "@/app/utils/formatDate";
import { getAllItems } from "@/api/items";
import { getReservationsByTypeAndDate } from "@/api/reservations";
import ScheduleTable from "./Schedule/ScheduleTable";
import MeetingsSkeleton from "./skeleton";

export default function MeetingRoomSchedule(): JSX.Element {
  const { selectedDate } = useDateStore();

  const formattedDate = formatDate(selectedDate);

  const { data: meetingsData = [], isLoading: meetingsIsLoading } = useQuery<IReservation[]>({
    queryKey: ["meetings", formattedDate, MEETING_ROOMS_TYPE],
    queryFn: () => getReservationsByTypeAndDate({ itemType: MEETING_ROOMS_TYPE, date: formattedDate }),
  });

  const { data: roomsData = [], isLoading: roomsIsLoading } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MEETING_ROOMS_TYPE],
    queryFn: () => getAllItems({ itemType: MEETING_ROOMS_TYPE }),
  });

  if (meetingsIsLoading || roomsIsLoading) return <MeetingsSkeleton />;

  return <ScheduleTable rooms={roomsData} meetingsData={meetingsData} selectedDate={formattedDate} />;
}
