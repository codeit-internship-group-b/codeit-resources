import { Suspense } from "react";
import ComponentWithUseClient from "./_components/ComponentWithUseClient";
import Skeleton from "./_components/skeleton";

export default function Members(): JSX.Element {
  return (
    <Suspense fallback={<Skeleton />}>
      <ComponentWithUseClient />
    </Suspense>
  );
}
