"use client";

import { useQuery } from "@tanstack/react-query";
import { type IReservation } from "@repo/types/src/reservationType";
import { type TBaseItem } from "@repo/types";
import { useDateStore } from "@/app/store/useDateStore";
import { getReservationsByTypeAndDate } from "@/api/reservations";
import { getAllItems } from "@/api/items";
import ScheduleTable from "./Schedule/ScheduleTable";

export default function MeetingRoomSchedule(): JSX.Element {
  const { selectedDate } = useDateStore();

  const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(
    2,
    "0",
  )}-${String(selectedDate.day).padStart(2, "0")}`;

  const MeetingRoomsType = "room";

  const { data: meetingsData = [], isLoading: meetingsIsLoading } = useQuery<IReservation[]>({
    queryKey: ["meetings", formattedDate, MeetingRoomsType],
    queryFn: () => getReservationsByTypeAndDate({ itemType: MeetingRoomsType, date: formattedDate }),
  });

  const { data: roomsData = [], isLoading: roomsIsLoading } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MeetingRoomsType],
    queryFn: () => getAllItems({ itemType: MeetingRoomsType }),
  });

  if (meetingsIsLoading || roomsIsLoading) return <div>로딩중이에요~</div>;

  return (
    <>
      <ScheduleTable rooms={roomsData} meetingsData={meetingsData} selectedDate={formattedDate} />
      <div>
        {meetingsData.length > 0 ? (
          meetingsData.map((meeting) => (
            <div
              key={meeting._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <p>예약자: {meeting.user.name || "알 수 없음"}</p>
              <p>회의실: {typeof meeting.item === "string" ? meeting.item : meeting.item.name || "알 수 없음"}</p>
              <p>
                시작 시간:{" "}
                {new Date(meeting.startAt).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </p>
              <p>
                종료 시간:{" "}
                {new Date(meeting.endAt).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </p>
              <p>상태: {meeting.status}</p>
              {meeting.notes ? <p>메모: {meeting.notes}</p> : null}
            </div>
          ))
        ) : (
          <p>예약된 회의가 없습니다. {formattedDate}</p>
        )}
      </div>
      <div>
        {roomsData.length > 0 ? (
          roomsData.map((room) => (
            <div
              key={room._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <p>회의실 이름: {room.name}</p>
              <p>상태: {room.status}</p>
              <p>설명: {room.description ?? "없음"}</p>
            </div>
          ))
        ) : (
          <p>등록된 회의실이 없습니다.</p>
        )}
      </div>
    </>
  );
}
