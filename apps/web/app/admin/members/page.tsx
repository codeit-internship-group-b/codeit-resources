import dynamic from "next/dynamic";
import ErrorResetBoundary from "@/components/common/ErrorResetBoundary";
import ErrorFallback from "@/components/common/Fallback";
import Skeleton from "./_components/skeleton";

const DynamicImport = dynamic(() => import("./_components/MembersContent"), {
  loading: () => <Skeleton />,
  ssr: false,
});

export default function MembersPage(): JSX.Element {
  return (
    <ErrorResetBoundary fallbackComponent={ErrorFallback}>
      <DynamicImport />
    </ErrorResetBoundary>
  );
}
