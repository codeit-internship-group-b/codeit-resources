import ListItemSkeleton from "@/components/common/Skeleton/ListItemSkeleton";

export default function MemberListSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 8 }).map((_, index) => (
        // index 이외 고유 key값 X
        // eslint-disable-next-line react/no-array-index-key
        <ListItemSkeleton key={index} type="member" thickness="thick" color="white" showHamburger={false} />
      ))}
    </div>
  );
}
