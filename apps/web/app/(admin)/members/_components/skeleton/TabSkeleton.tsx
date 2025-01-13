import LoadingBar from "@/components/common/Skeleton/LoadingBar";

export default function TabsSkeleton(): JSX.Element {
  return (
    <>
      <ul className="mb-16 flex flex-row gap-32 whitespace-nowrap">
        {Array.from({ length: 3 }).map((_, index) => (
          // index 이외 고유 key값 X
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <LoadingBar classNames="w-60 h-12" />
          </li>
        ))}
      </ul>
      <div className="mb-24 w-full animate-pulse border border-gray-200/10" />
    </>
  );
}
