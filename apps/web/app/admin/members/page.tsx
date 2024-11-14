import ComponentWithUseClient from "./_components/ComponentWithUseClient";
import Skeleton from "./_components/skeleton";
import AsyncBoundary from "./_components/AsyncBoundary";
import ErrorFallback from "./_components/ErrorFallback";

export default function Members(): JSX.Element {
  return (
    <AsyncBoundary fallbackComponent={ErrorFallback} suspenseFallback={<Skeleton />}>
      <ComponentWithUseClient />
    </AsyncBoundary>
  );
}
