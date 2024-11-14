import MembersContent from "./_components/MembersContent";
import Skeleton from "./_components/skeleton";
import AsyncBoundary from "./_components/AsyncBoundary";
import ErrorFallback from "./_components/ErrorFallback";

export default function MembersPage(): JSX.Element {
  return (
    <AsyncBoundary fallbackComponent={ErrorFallback} suspenseFallback={<Skeleton />}>
      <MembersContent />
    </AsyncBoundary>
  );
}
