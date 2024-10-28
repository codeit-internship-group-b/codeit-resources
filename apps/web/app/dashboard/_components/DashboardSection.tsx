import cn from "@ui/src/utils/cn";
import EmptyState from "./EmptyState";

interface DashboardSectionProps {
  type: "meeting" | "equipment";
  data: ItemInfo[];
}

interface ItemInfo {
  title: string;
  time: string;
  resource: string;
  status: string;
}

export default function DashboardSection({ type, data }: DashboardSectionProps): JSX.Element {
  const isMeeting = type === "meeting";

  return (
    <div>
      <h1 className="mb-16">{isMeeting ? "내 회의" : "내 장비"}</h1>
      <hr className="mb-16 border-gray-200/10" />
      {data.length > 0 ? (
        <div className="scrollbar-hidden flex gap-16 overflow-auto">
          {data.map((item) => (
            <div
              key={item.title}
              className={cn(
                "rounded-8 text-custom-black/80 mb-4 border border-solid border-gray-200/10 p-8",
                isMeeting ? "min-w-259 w-259 h-148 md:w-275 md:h-172" : "min-w-240 w-240 h-144 md:w-280 md:h-160",
              )}
            >
              <div className="relative bottom-6 text-right">
                <span className="text-10 rounded-8 bg-[#EB008D] px-4 py-2 text-center font-medium text-white">
                  {item.status}
                </span>
              </div>
              <div
                className={cn(
                  "grid grid-rows-2",
                  isMeeting
                    ? "relative bottom-6 gap-4 pl-24 md:bottom-0 md:gap-8"
                    : "relative bottom-6 justify-center gap-8 md:bottom-2 md:gap-12",
                )}
              >
                {isMeeting ? <div className="text-2lg-bold">{item.title}</div> : null}
                <time className={cn("text-13 leading-21", !isMeeting && "order-1")}>{item.time}</time>
                <div className={cn(!isMeeting && "text-center")}>
                  <span className="rounded-32 border-custom-black/5 !text-sm-bold border border-solid bg-purple-100 px-8 py-4 text-purple-300">
                    {item.resource}
                  </span>
                </div>
              </div>
              <div className={cn(isMeeting ? "pr-8 text-right" : "pt-8 text-center")}>
                <button
                  type="button"
                  className={cn(
                    "rounded-6 text-sm-medium border-custom-black/20 hover:bg-custom-black/5 hover:text-custom-black relative border border-solid px-12 py-5 transition-all duration-300 ease-linear",
                    isMeeting ? "-top-20 md:-top-4" : "-top-10 md:-top-2",
                  )}
                >
                  {isMeeting ? "회의 종료" : "장비 반납"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState isMeeting={isMeeting} />
      )}
    </div>
  );
}
