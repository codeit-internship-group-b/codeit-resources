import AsyncBoundary from "@/components/common/Boundary";
import ErrorFallback from "@/components/common/Fallback";
import MembersContent from "./_components/MembersContent";
import Skeleton from "./_components/skeleton";

export default function MembersPage(): JSX.Element {
  return (
    <AsyncBoundary fallbackComponent={ErrorFallback} suspenseFallback={<Skeleton />}>
      <MembersContent />
    </AsyncBoundary>
  );
}
