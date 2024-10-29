import cn from "@ui/src/utils/cn";
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

  return (
    <div>
      <h1 className="mb-16">내 회의</h1>
      <hr className="mb-16 border-gray-200/10" />
      {data.length > 0 ? (
        <div className="scrollbar-hidden flex gap-16 overflow-auto">
          {data.map((item) => (
            <div
              key={item._id}
              className={cn(
                "rounded-8 text-custom-black/80 min-w-259 w-259 h-148 md:w-275 md:h-172 mb-4 border border-solid border-gray-200/10 p-8",
              )}
            >
              <div className="relative bottom-6 text-right">
                {isInProgress(item.startAt, item.endAt) ? (
                  <span className="text-10 rounded-8 bg-[#EB008D] px-4 py-2 text-center font-medium text-white">
                    진행 중
                  </span>
                ) : (
                  <span className="text-10 rounded-8 px-4 py-2 text-center font-medium text-white" />
                )}
              </div>
              <div className={cn("relative bottom-6 grid grid-rows-2 gap-4 pl-24 md:bottom-0 md:gap-8")}>
                <div className="text-2lg-bold">{item.notes}</div>
                <time className="text-13 leading-21 h-26">{`${formatTime(item.startAt)} ~ ${formatTime(item.endAt)}`}</time>
                <div>
                  <span className="rounded-32 border-custom-black/5 !text-sm-bold border border-solid bg-purple-100 px-8 py-4 text-purple-300">
                    {item.itemName}
                  </span>
                </div>
              </div>
              <div className="pr-8 text-right">
                {isInProgress(item.startAt, item.endAt) ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleEndMeeting(item._id);
                    }}
                    className={cn(
                      "rounded-6 text-sm-medium border-custom-black/20 hover:bg-custom-black/5 hover:text-custom-black relative -top-20 border border-solid px-12 py-5 transition-all duration-300 ease-linear md:-top-4",
                    )}
                  >
                    회의 종료
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
