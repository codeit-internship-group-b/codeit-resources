import LoadingBar from "@/components/common/Skeleton/LoadingBar";

export default function DashboardSectionLoading(): JSX.Element {
  return (
    <div>
      <h1 className="mb-16">내 회의</h1>
      <hr className="mb-16 border-gray-200/10" />
      <div className="scrollbar-hidden flex gap-16 overflow-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="rounded-8 text-custom-black/80 min-w-259 w-259 h-148 md:w-275 md:h-172 mb-4 flex flex-col gap-16 border border-solid border-gray-200/10 p-32"
          >
            <LoadingBar classNames="h-20 w-100" />
            <LoadingBar classNames="h-12 w-80" />
            <LoadingBar classNames="h-26 w-60" />
          </div>
        ))}
      </div>
    </div>
  );
}
