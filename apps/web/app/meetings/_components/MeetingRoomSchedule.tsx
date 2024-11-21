"use client";

import { useDateStore } from "@/app/store/useDateStore";
import { useMeetingsData } from "@/app/_hooks/useMeetingsData";
import { useRoomsData } from "@/app/_hooks/useRoomsData";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { formatDate } from "@/app/utils/formatDate";
import ScheduleTable from "./Schedule/ScheduleTable";

export default function MeetingRoomSchedule(): JSX.Element {
  const { selectedDate } = useDateStore();

  const formattedDate = formatDate(selectedDate);

  const { data: meetingsData = [], isLoading: meetingsIsLoading } = useMeetingsData(MEETING_ROOMS_TYPE, formattedDate);

  const { data: roomsData = [], isLoading: roomsIsLoading } = useRoomsData(MEETING_ROOMS_TYPE);

  if (meetingsIsLoading || roomsIsLoading) return <div>로딩~</div>;

  return <ScheduleTable rooms={roomsData} meetingsData={meetingsData} selectedDate={formattedDate} />;
}
