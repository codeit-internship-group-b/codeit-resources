"use client";

import { type ReactNode, type ComponentType } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface ErrorResetBoundaryProps {
  children: ReactNode;
  fallbackComponent: ComponentType<FallbackProps>;
}

export default function ErrorResetBoundary({
  children,
  fallbackComponent: FallbackComponent,
}: ErrorResetBoundaryProps): JSX.Element {
  return <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>;
}
