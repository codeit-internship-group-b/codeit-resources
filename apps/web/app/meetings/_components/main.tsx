"use client";

import { useDateStore } from "@/app/store/useDateStore";
import { notify } from "@/app/store/useToastStore";
import { rooms } from "../../mocks/mockData";
import ScheduleTable from "./Schedule/ScheduleTable";

export default function MeetingRoomSchedule(): JSX.Element {
  const handleSuccess = () => {
    notify("success", "성공적으로 처리되었습니다!");
  };

  const handleError = () => {
    notify("error", "성공적으로 처리되었습니다!");
  };

  const handleInfo = () => {
    notify("info", "성공적으로 처리되었습니다!");
  };

  const { selectedDate } = useDateStore();

  const formattedDate = `${String(selectedDate.year)}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return (
    <>
      <ScheduleTable rooms={rooms} selectedDate={formattedDate} />
      <button
        onClick={handleSuccess}
        className="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
      >
        Show Toast
      </button>
      <button
        onClick={handleError}
        className="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
      >
        Show Toast
      </button>
      <button
        onClick={handleInfo}
        className="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
      >
        Show Toast
      </button>
    </>
  );
}
