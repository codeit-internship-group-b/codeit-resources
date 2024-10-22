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
  return (
    <div>
      <h1 className="mb-16">{type === "meeting" ? "내 회의" : "내 장비"}</h1>
      <hr className="mb-16 border-gray-200/10" />
      {data.length > 0 ? (
        <div className="flex gap-16 overflow-auto">
          {data.map((item) => (
            <div
              key={item.title}
              className={cn(
                "rounded-8 text-custom-black/80 mb-4 border border-solid border-gray-200/10 p-8",
                type === "meeting" ? "min-w-259 w-259 h-148" : "min-w-240 w-240 h-144",
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
                  type === "meeting" ? "relative bottom-6 gap-4 pl-24" : "relative bottom-6 justify-center gap-8",
                )}
              >
                {type === "meeting" && <div className="text-2lg-bold">{item.title}</div>}
                <time className={cn("text-13 leading-21", type === "meeting" ? "" : "order-1")}>{item.time}</time>
                <div className={cn(type === "meeting" ? "" : "text-center")}>
                  <span
                    className={cn(
                      "rounded-32 border-custom-black/5 !text-sm-bold border border-solid bg-purple-100 px-8 py-4 text-purple-300",
                    )}
                  >
                    {item.resource}
                  </span>
                </div>
              </div>
              <div className={cn(type === "meeting" ? "pr-8 text-right" : "pt-8 text-center")}>
                <button
                  type="button"
                  className={cn(
                    "rounded-6 text-sm-medium border-custom-black/20 relative border border-solid px-12 py-5",
                    type === "meeting" ? "-top-20" : "-top-10",
                  )}
                >
                  {type === "meeting" ? "회의 종료" : "장비 반납"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState type={type === "meeting" ? "meeting" : "equipment"} />
      )}
    </div>
  );
}
