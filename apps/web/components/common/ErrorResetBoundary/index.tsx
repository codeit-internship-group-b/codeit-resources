"use client";

import { type ReactNode, type ComponentType } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface ErrorResetBoundaryProps {
  children: ReactNode;
  fallbackComponent: ComponentType<FallbackProps>;
}

export default function ErrorResetBoundary({
  children,
  fallbackComponent: FallbackComponent,
}: ErrorResetBoundaryProps): JSX.Element {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
