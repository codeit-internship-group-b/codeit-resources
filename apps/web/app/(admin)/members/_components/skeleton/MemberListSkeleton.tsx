import ListItemSkeleton from "@/components/common/Skeleton/ListItemSkeleton";

export default function MemberListSkeleton(): JSX.Element {
  return (
    <div className="mb-80 flex flex-col pt-16">
      {Array.from({ length: 8 }).map((_, index) => (
        // index 이외 고유 key값 없음
        // eslint-disable-next-line react/no-array-index-key
        <ListItemSkeleton key={index} type="member" thickness="thick" color="white" showHamburger={false} />
      ))}
    </div>
  );
}
