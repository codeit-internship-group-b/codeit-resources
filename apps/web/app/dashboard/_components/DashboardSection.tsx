import { type IReservation } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { formatTime, isInProgress } from "@ui/src/utils/date";
import { patchMeetingStatus } from "@/api/dashboard";
import EmptyState from "./EmptyState";

interface DashboardSectionProps {
  data?: IReservation[];
}

export default function DashboardSection({ data = [] }: DashboardSectionProps): JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: patchMeetingStatusMutate } = useMutation({
    mutationFn: (_id: string) => patchMeetingStatus(_id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      notify({ type: "success", message: "회의가 종료되었습니다." });
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  const handleEndMeeting = (_id: string): void => {
    patchMeetingStatusMutate(_id);
  };

  const upcomingMeetings = data.filter((item) => item.status !== "completed" && new Date(item.endAt) > new Date());

  return (
    <div>
      <h1 className="mb-16">내 회의</h1>
      <hr className="mb-16 border-gray-200/10" />
      {upcomingMeetings.length > 0 ? (
        <div className="scrollbar-hidden overflow-auto md:flex md:gap-16">
          {upcomingMeetings.map((item) => (
            <div
              key={item._id}
              className="rounded-8 text-custom-black/80 h-123 md:w-275 md:h-172 relative mb-16 flex w-full flex-col gap-4 border border-solid border-gray-200/10 p-20 md:gap-8 md:p-32"
            >
              {isInProgress(item.startAt, item.endAt) ? (
                <span className="text-10 rounded-8 bg-magenta-100 absolute right-8 top-8 px-4 py-2 text-center font-medium text-white">
                  진행 중
                </span>
              ) : null}
              <div className="text-2lg-bold">{item.notes}</div>
              <time className="text-13 leading-21 h-26">{`${formatTime(item.startAt)} ~ ${formatTime(item.endAt)}`}</time>
              <div className="rounded-32 w-66 border-custom-black/5 !text-sm-bold md:w-78 md:!text-15 h-24 border border-solid bg-purple-100 px-8 text-purple-300 md:h-32 md:px-10 md:py-4">
                {typeof item.item === "string" ? item.item : item.item.name}
              </div>
              {isInProgress(item.startAt, item.endAt) ? (
                <button
                  type="button"
                  onClick={() => {
                    handleEndMeeting(item._id);
                  }}
                  className="w-74 rounded-6 text-sm-medium border-custom-black/20 hover:bg-custom-black/5 hover:text-custom-black absolute bottom-16 right-16 h-32 border border-solid py-5 transition-all duration-300 ease-linear"
                >
                  회의 종료
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
