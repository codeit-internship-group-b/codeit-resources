/* eslint-disable react/no-array-index-key */
import ListItemSkeleton from "@/components/common/Skeleton/ListItemSkeleton";

export default function SkeletonList(): JSX.Element {
  return (
    <div className="flex flex-col gap-16">
      {Array.from({ length: 8 }).map((_, index) => (
        <ListItemSkeleton key={index} type="member" thickness="thick" color="white" showHamburger={false} />
      ))}
    </div>
  );
}
